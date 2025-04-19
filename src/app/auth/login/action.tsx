"use server";

import { handleServerActionError } from "@/helpers/error";
import { createToken } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Login } from "@/schema/auth";
import { UserWithPermissionSchema } from "@/schema/user";
import { COOKIE_MAX_AGE, COOKIE_NAME } from "@/utils/constants";
import { hashData } from "@/utils/crypto";
import { cookies } from "next/headers";

export const login = async (data: Login) => {
    try {
        const hashedPassword = await hashData(data.password);
        const user = await db.users.findUnique({
            where: {
                email: data.email,
                password: hashedPassword
            },
            include: {
                permissions: true
            }
        });

        if (!user) {
            throw new Error("Invalid email or password");
        }

        const validatedUser = UserWithPermissionSchema.parse(user);

        const token = await createToken(validatedUser);

        const cookieStore = await cookies();
        cookieStore.set(COOKIE_NAME, token, {
            // httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: COOKIE_MAX_AGE, // 1 day
        })

        return { success: true, data: token };
    } catch (error) {
        handleServerActionError(error);
        return { success: false, data: { message: "Invalid email or password" } };

    }
}
