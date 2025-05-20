"use server";

import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { handleServerActionError } from "@/helpers/error";
import {
    FrontendPlaylistDTOSchema,
} from "@/schema/frontendPlaylist";
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
        const user = await authorizeUser(["view:frontend-playlist"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        // Build where conditions
        let whereConditions: Prisma.FrontendPlaylistWhereInput = {};

        if (search) {
            whereConditions = {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { slug: { contains: search, mode: "insensitive" } }
                ],
            };
        }

        // Build ordering
        const orderBy: Prisma.FrontendPlaylistOrderByWithRelationInput = {};
        orderBy[sortBy as keyof Prisma.FrontendPlaylistOrderByWithRelationInput] = sortDirection;

        // Get data with pagination
        const [playlists, totalCount] = await Promise.all([
            db.frontendPlaylist.findMany({
                where: whereConditions,
                orderBy,
                skip,
                take,
            }),
            db.frontendPlaylist.count({
                where: whereConditions,
            }),
        ]);

        // Parse to DTO
        const playlistsDTO = playlists.map((playlist: any) => FrontendPlaylistDTOSchema.parse(playlist));

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
