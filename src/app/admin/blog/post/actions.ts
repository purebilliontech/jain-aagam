"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import { BlogDataTableRowSchema } from "@/schema/blog";
import type { PaginatedReqParams } from "@/schema/common";
import { authorizeUser } from "@/lib/auth";

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

    const whereConditions: Prisma.BlogWhereInput = search
      ? {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { synopsis: { contains: search, mode: "insensitive" } },
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
      }
      : {};

    const orderBy: Prisma.BlogOrderByWithRelationInput = {};
    orderBy[sortBy as keyof Prisma.BlogOrderByWithRelationInput] = sortDirection;

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

    const blogPostsDTO = posts.map(post => BlogDataTableRowSchema.parse(post));

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

    await db.tagsToBlog.deleteMany({ where: { blogId: id } });
    console.log("Deleted tag relationships for blogId:", id);

    await db.blog.delete({ where: { id } });
    console.log("Deleted blog post with id:", id);

    return { success: true, data: null };
  } catch (error) {
    console.error("Error in deleteBlogPostById:", error);
    handleServerActionError(error);
    return { success: false, data: null };
  }
};