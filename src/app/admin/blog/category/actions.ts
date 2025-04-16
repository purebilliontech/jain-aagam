"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
  BlogCategoryDTOSchema,
} from "@/schema/blogCategory";

type GetCategoriesParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

export const getCategories = async ({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "createdAt",
  sortDirection = "desc",
}: GetCategoriesParams) => {
  try {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where conditions
    let whereConditions: Prisma.BlogCategoryWhereInput = {};

    if (search) {
      whereConditions = {
        OR: [
          { name: { contains: search, mode: "insensitive" } }
        ],
      };
    }

    // Build ordering
    const orderBy: Prisma.BlogCategoryOrderByWithRelationInput = {};
    orderBy[sortBy as keyof Prisma.BlogCategoryOrderByWithRelationInput] = sortDirection;

    // Get data with pagination
    const [categories, totalCount] = await Promise.all([
      db.blogCategory.findMany({
        where: whereConditions,
        orderBy,
        skip,
        take,
      }),
      db.blogCategory.count({
        where: whereConditions,
      }),
    ]);

    // Parse to DTO
    const categoriesDTO = categories.map(category => BlogCategoryDTOSchema.parse(category));

    return {
      success: true,
      data: {
        categories: categoriesDTO,
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
        categories: [],
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

export const deleteCategoryById = async (id: string) => {
  try {
    await db.blogCategory.delete({
      where: { id },
    });

    return { success: true, data: null };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: null };
  }
};