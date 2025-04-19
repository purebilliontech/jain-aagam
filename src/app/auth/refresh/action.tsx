"use server";

import { handleServerActionError } from "@/helpers/error";
import { createToken, getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserWithPermissionSchema } from "@/schema/user";
import { COOKIE_MAX_AGE, COOKIE_NAME } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const refreshSession = async () => {
    try {
        const userSession = await getCurrentUser();

        if (!userSession) {
            return {
                success: false,
                message: "User not found"
            };
        }

        // Find user by phone
        const user = await db.users.findUnique({
            where: { id: userSession.id },
            include: {
                permissions: true
            }
        });

        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        const validatedUser = UserWithPermissionSchema.parse(user);

        // Update last login time
        await db.users.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

        // Create JWT token
        const token = await createToken(validatedUser);

        // Set token in cookie
        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: COOKIE_MAX_AGE, // 1 day
        });

        revalidatePath("/");
        revalidatePath("/admin");
        return {
            success: true,
            message: "Session refreshed"
        };
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            message: "Failed to refresh session"
        };
    }

}
