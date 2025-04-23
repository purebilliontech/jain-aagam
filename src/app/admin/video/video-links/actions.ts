"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
  YoutubeVideoDTOSchema
} from "@/schema/video";
import type { PaginatedReqParams } from "@/schema/common";
import { authorizeUser } from "@/lib/auth";

export const getYoutubeVideos = async ({
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "createdAt",
  sortDirection = "desc",
}: PaginatedReqParams) => {
  try {
    const user = await authorizeUser(["view:video"]);
    if (!user.success) {
      throw new Error(user.message);
    }

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build where conditions
    let whereConditions: Prisma.YoutubeVideoWhereInput = {};

    if (search) {
      whereConditions = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    // Build ordering
    const orderBy: Prisma.YoutubeVideoOrderByWithRelationInput = {};
    orderBy[sortBy as keyof Prisma.YoutubeVideoOrderByWithRelationInput] = sortDirection;

    // Get data with pagination
    const [videos, totalCount] = await Promise.all([
      db.youtubeVideo.findMany({
        where: whereConditions,
        orderBy,
        skip,
        take,
      }),
      db.youtubeVideo.count({
        where: whereConditions,
      }),
    ]);

    // Parse to DTO
    const videosDTO = videos.map((video: any) => YoutubeVideoDTOSchema.parse(video));

    return {
      success: true,
      data: {
        videos: videosDTO,
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
        videos: [],
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

export const deleteYoutubeVideoById = async (id: string) => {
  try {
    const user = await authorizeUser(["modify:video"]);
    if (!user.success) {
      throw new Error(user.message);
    }

    await db.youtubeVideo.delete({
      where: { id },
    });

    return { success: true, data: null };
  } catch (error) {
    handleServerActionError(error);
    return { success: false, data: null };
  }
};