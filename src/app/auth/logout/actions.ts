"use server";

import { COOKIE_NAME } from "@/utils/constants";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  // Clear the token cookie
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  revalidatePath("/");
  redirect("/auth/login");
}