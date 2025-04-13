"use server";

import { handleServerActionError } from "@/helpers/error";
import { db } from "@/lib/db";
import { UserDTOSchema, type UserDTO } from "@/schema/user";

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