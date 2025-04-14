"use client";

import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { COOKIE_NAME } from "@/utils/constants";
import type { UserPayloadData } from "./auth";

// Define user type here to avoid circular dependency
export type UserData = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  roleId: string;
  isSeller: boolean;
  buyerId: string | null;
  sellerId: string | null;
  permissions: string[];
};

/**
 * Get JWT token from browser cookie
 * @returns The JWT token or null if not found
 */
export function getTokenFromCookie(): string | null {
  return Cookies.get(COOKIE_NAME) || null;
}

/**
 * Get current user from token in cookie (client-side)
 * @returns The current user or null if not authenticated
 */
export async function getCurrentUser(): Promise<UserPayloadData | null> {
  const token = getTokenFromCookie();
  if (!token) return null;
  const { payload } = decodeJwt(token);
  console.log(payload);
  const payloadData = payload as UserPayloadData;

  return payloadData;
}