"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
  VideoTagsDTOSchema,
} from "@/schema/videoTag";
import type { PaginatedReqParams } from "@/schema/common";
import { authorizeUser } from "@/lib/auth";

export const getTags = async ({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "createdAt",
  sortDirection = "desc",
}: PaginatedReqParams) => {
  try {
    const user = await authorizeUser(["view:video-tag"]);
    if (!user.success) {
      throw new Error(user.message);
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where conditions
    let whereConditions: Prisma.VideoTagWhereInput = {};

    if (search) {
      whereConditions = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { slug: { contains: search, mode: "insensitive" } }
        ],
      };
    }

    // Build ordering
    const orderBy: Prisma.VideoTagOrderByWithRelationInput = {};
    orderBy[sortBy as keyof Prisma.VideoTagOrderByWithRelationInput] = sortDirection;

    // Get data with pagination
    const [tags, totalCount] = await Promise.all([
      db.videoTag.findMany({
        where: whereConditions,
        orderBy,
        skip,
        take,
      }),
      db.videoTag.count({
        where: whereConditions,
      }),
    ]);

    // Parse to DTO
    const tagsDTO = tags.map((tag: any) => VideoTagsDTOSchema.parse(tag));

    return {
      success: true,
      data: {
        tags: tagsDTO,
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
        tags: [],
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

export const deleteTagById = async (id: string) => {
  try {
    const user = await authorizeUser(["modify:video-tag"]);
    if (!user.success) {
      throw new Error(user.message);
    }
    const tagInUse = await db.tagsToVideo.findFirst({
      where: { videoTagsId: id },
    });

    if (tagInUse) {
      return {
        success: false,
        data: null,
        message: "Tag is in use and cannot be deleted.",
      };
    }

    await db.videoTag.delete({
      where: { id },
    });

    return { success: true, data: null };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: null };
  }
};