"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { UserDTOSchema, type CreateUser, type UpdateUser, type UserDTO } from "@/schema/user";
import { Prisma } from "@prisma/client";

export const getUserById = async (id: string): Promise<UserDTO | null> => {
    try {
        if (id === "new") {
            return null;
        }
        const user = await db.users.findUnique({
            where: {
                id,
            },
        });
        return UserDTOSchema.parse(user);
    } catch (error) {
        handleServerActionError(error);
        return null;
    }
}

export const createUser = async (data: CreateUser): Promise<UserDTO | null> => {
    try {
        const newUser = await db.users.create({
            data,
        });
        return UserDTOSchema.parse(newUser);
    } catch (error) {
        handleServerActionError(error);
        return null;
    }
}

export const updateUserById = async (id: string, data: UpdateUser): Promise<UserDTO | null> => {
    try {
        const updatedUser = await db.users.update({
            where: { id },
            data,
        });
        return UserDTOSchema.parse(updatedUser);
    } catch (error) {
        handleServerActionError(error);
        return null;
    }
}

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

export const deleteUser = async (id: string): Promise<boolean> => {
    try {
        // First delete user permissions
        await db.userPermissions.deleteMany({
            where: {
                userId: id
            }
        });
        
        // Then delete the user
        await db.users.delete({
            where: {
                id
            }
        });
        
        return true;
    } catch (error) {
        handleServerActionError(error);
        return false;
    }
}