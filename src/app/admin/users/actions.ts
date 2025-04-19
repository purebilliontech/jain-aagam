"use server";

import { handleServerActionError } from "@/helpers/error";
import { authorizeUser } from "@/lib/auth";
import { db } from "@/lib/db";
import type { PaginatedReqParams } from "@/schema/common";
import { UserDTOSchema } from "@/schema/user";
import type { Prisma } from "@prisma/client";

export const getUsers = async ({
    page = 1,
    pageSize = 10,
    search = '',
    sortBy = 'createdAt',
    sortDirection = 'desc'
}: PaginatedReqParams) => {
    try {
        const user = await authorizeUser(["view:user"]);
        if (!user.success) {
            return { success: false, data: null, message: user.message };
        }

        const skip = (page - 1) * pageSize;
        const take = pageSize;

        // Build where conditions
        let whereConditions: Prisma.UsersWhereInput = {};

        if (search) {
            whereConditions = {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ]
            };
        }

        // Build ordering
        let orderBy: Prisma.UsersOrderByWithRelationInput = {};
        orderBy[sortBy as keyof Prisma.UsersOrderByWithRelationInput] = sortDirection;

        // Get data with pagination
        const [users, totalCount] = await Promise.all([
            db.users.findMany({
                where: whereConditions,
                orderBy,
                skip,
                take,
            }),
            db.users.count({
                where: whereConditions
            })
        ]);

        // Parse to DTO
        const usersDTO = users.map(user => UserDTOSchema.parse(user));

        return {
            success: true,
            data: {
                users: usersDTO,
                meta: {
                    totalCount,
                    page,
                    pageSize,
                    totalPages: Math.ceil(totalCount / pageSize)
                }
            }
        };
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: {
                users: [],
                meta: {
                    totalCount: 0,
                    page,
                    pageSize,
                    totalPages: 0
                }
            }
        };
    }
}