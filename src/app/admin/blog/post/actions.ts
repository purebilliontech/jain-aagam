"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
  BlogDataTableRowSchema,
  BlogDTOSchema
} from "@/schema/blog";

type GetBlogPostsParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

export const getBlogPosts = async ({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "createdAt",
  sortDirection = "desc",
}: GetBlogPostsParams) => {
  try {
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
    await db.blog.delete({
      where: { id },
    });

    return { success: true, data: null };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: null };
  }
};