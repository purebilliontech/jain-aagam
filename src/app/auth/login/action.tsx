"use server";

import { handleServerActionError } from "@/helpers/error";
import { createToken } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Login } from "@/schema/auth";
import { UserWithPermissionSchema } from "@/schema/user";
import { COOKIE_MAX_AGE, COOKIE_NAME } from "@/utils/constants";
import { comparePassword, encryptPassword, hashData } from "@/utils/crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export const login = async (data: Login) => {
    try {
        const pass = await encryptPassword(data.password);

        // const comparision = await comparePassword(data.password, pass);
        const comparision = await comparePassword(data.password, "$2b$10$oIgbccEBau1JMfgD1OJnWOb5Mj0bH5l6factfv4b2db01w.YcdcxK");
        console.log("Comparision", comparision)

        console.log(pass);
        const user = await db.users.findUnique({
            where: {
                email: data.email,
            },
            include: {
                permissions: true
            }
        });
        if (!user) {
            console.log("User not found")
            throw new Error("Invalid email or password");
        }

        const isSame = await comparePassword(data.password, user.password);
        if (!isSame) {
            console.log("Password is invalid")
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
