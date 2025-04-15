import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { UserDTOSchema } from "@/schema/user";
import type { Prisma } from "@prisma/client";

type GetUsersParams = {
    page: number;
    pageSize: number;
    search?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}

export const getUsers = async ({
    page = 1,
    pageSize = 10,
    search = '',
    sortBy = 'createdAt',
    sortDirection = 'desc'
}: GetUsersParams) => {
    try {
        const skip = (page - 1) * pageSize;
        const take = pageSize;

        // Build where conditions
        let whereConditions: Prisma.UsersWhereInput = {};

        if (search) {
            whereConditions = {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { role: { contains: search, mode: 'insensitive' } }
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
            users: usersDTO,
            meta: {
                totalCount,
                page,
                pageSize,
                totalPages: Math.ceil(totalCount / pageSize)
            }
        };
    } catch (error) {
        handleServerActionError(error);
        return {
            users: [],
            meta: {
                totalCount: 0,
                page,
                pageSize,
                totalPages: 0
            }
        };
    }
}