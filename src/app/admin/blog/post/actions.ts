"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
  BlogDataTableRowSchema,
} from "@/schema/blog";
import type { PaginatedReqParams } from "@/schema/common";
import { authorizeUser } from "@/lib/auth";

// actions.ts - Modified getBlogPosts function
export const getBlogPosts = async ({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "createdAt",
  sortDirection = "desc",
}: PaginatedReqParams) => {
  console.log("getBlogPosts called with params:", { page, pageSize, search, sortBy, sortDirection });
  try {
    const user = await authorizeUser(["view:blog"]);
    if (!user.success) {
      throw new Error(user.message);
    }
    
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where conditions
    let whereConditions: Prisma.BlogWhereInput = {};

    if (search) {
      whereConditions = {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { synopsis: { contains: search, mode: "insensitive" } },
          { authorName: { contains: search, mode: "insensitive" } },
          {
            blogToTags: {
              some: {
                tag: {
                  name: { contains: search, mode: "insensitive" }
                }
              }
            }
          }
        ],
      };
    }

    // Build ordering
    const orderBy: Prisma.BlogOrderByWithRelationInput = {};
    orderBy[sortBy as keyof Prisma.BlogOrderByWithRelationInput] = sortDirection;

    // Get data with pagination
    const [posts, totalCount] = await Promise.all([
      db.blog.findMany({
        where: search ? whereConditions : undefined,
        include: {
          banner: true,
          blogToTags: {
            include: {
              tag: true
            }
          }
        },
        orderBy,
        skip,
        take,
      }),
      db.blog.count({
        where: search ? whereConditions : undefined,
      }),
    ]);

    // Process the data before validation
    const processedPosts = posts.map(post => {
      return {
        ...post,
        // Generate tagsString for display
        tagsString: post.blogToTags.map(relation => relation.tag.name).join(', ')
      };
    });

    // Parse with the updated schema
    const blogPostsDTO = processedPosts.map(post => BlogDataTableRowSchema.parse(post));

    return {
      success: true,
      data: {
        posts: blogPostsDTO,
        meta: {
          totalCount,
          page,
          pageSize,
          totalPages: Math.ceil(totalCount / pageSize),
        },
      }
    };
  } catch (error) {
    console.error("Error in getBlogPosts:", error);
    handleServerActionError(error);
    return {
      success: false,
      data: {
        posts: [],
        meta: {
          totalCount: 0,
          page,
          pageSize,
          totalPages: 0,
        },
      }
    };
  }
};

export const deleteBlogPostById = async (id: string) => {
  console.log("deleteBlogPostById called with id:", id);
  try {
    const user = await authorizeUser(["modify:blog"]);
    console.log("User authorization result:", user);
    if (!user.success) {
      throw new Error(user.message);
    }
    
    // First delete all tag relationships
    await db.tagsToBlog.deleteMany({
      where: { blogId: id }
    });
    console.log("Deleted tag relationships for blogId:", id);
    
    // Then delete the blog post
    await db.blog.delete({
      where: { id },
    });
    console.log("Deleted blog post with id:", id);

    return { success: true, data: null };
  } catch (error) {
    console.error("Error in deleteBlogPostById:", error);
    handleServerActionError(error);
    return { success: false, data: null };
  }
};