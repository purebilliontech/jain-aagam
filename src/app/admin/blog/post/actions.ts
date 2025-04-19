"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
  BlogDataTableRowSchema,
} from "@/schema/blog";
import type { PaginatedReqParams } from "@/schema/common";
import { authorizeUser } from "@/lib/auth";

export const getBlogPosts = async ({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "createdAt",
  sortDirection = "desc",
}: PaginatedReqParams) => {
  try {
    const user = await authorizeUser(["view:blog"]);
    if (!user.success) {
      return { success: false, data: null, message: user.message };
    }
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where conditions
    let whereConditions: Prisma.BlogWhereInput = {};

    if (search) {
      whereConditions = {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { tagsString: { contains: search, mode: "insensitive" } }
        ],
      };
    }

    // Build ordering
    const orderBy: Prisma.BlogOrderByWithRelationInput = {};
    orderBy[sortBy as keyof Prisma.BlogOrderByWithRelationInput] = sortDirection;

    // Get data with pagination
    const [posts, totalCount] = await Promise.all([
      db.blog.findMany({
        where: whereConditions,
        include: {
          category: true,
        },
        omit: {
          contentJson: true
        },
        orderBy,
        skip,
        take,
      }),
      db.blog.count({
        where: whereConditions,
      }),
    ]);

    // Parse to DTO
    const blogPostsDTO = posts.map((post: any) => BlogDataTableRowSchema.parse(post));

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
  try {
    const user = await authorizeUser(["modify:blog"]);
    if (!user.success) {
      return { success: false, data: null, message: user.message };
    }
    await db.blog.delete({
      where: { id },
    });

    return { success: true, data: null };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: null };
  }
};