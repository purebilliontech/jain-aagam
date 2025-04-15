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