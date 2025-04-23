"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import { PlaylistDTOSchema } from "@/schema/playlist";
import type { PaginatedReqParams } from "@/schema/common";
import { authorizeUser } from "@/lib/auth";

export const getPlaylists = async ({
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
    let whereConditions: Prisma.PlaylistWhereInput = {};

    if (search) {
      whereConditions = {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    // Build ordering
    const orderBy: Prisma.PlaylistOrderByWithRelationInput = {};
    orderBy[sortBy as keyof Prisma.PlaylistOrderByWithRelationInput] = sortDirection;

    // Get data with pagination
    const [playlists, totalCount] = await Promise.all([
      db.playlist.findMany({
        where: whereConditions,
        orderBy,
        skip,
        take,
      }),
      db.playlist.count({
        where: whereConditions,
      }),
    ]);

    // Parse to DTO
    const playlistsDTO = playlists.map((playlist: any) => PlaylistDTOSchema.parse(playlist));

    return {
      success: true,
      data: {
        playlists: playlistsDTO,
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
        playlists: [],
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