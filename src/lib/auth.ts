import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { User } from "@prisma/client";
import type { UserWithRolePermission } from "@/schema/user";
import { COOKIE_NAME, JWT_EXPIRY, JWT_SECRET } from "@/utils/constants";


export interface UserPayloadData {
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

export interface JwtUserPayload extends UserPayloadData, JWTPayload { };

/**
 * Create JWT token with user info
 * @param user The user to create a token for
 * @returns The JWT token
 */
export async function createToken(user: UserWithRolePermission): Promise<string> {
  const payload: JwtUserPayload = {
    id: user.id,
    name: user.name,
    phone: user.phone,
    email: user.email,
    roleId: user.roleId,
    isSeller: user.isSeller,
    buyerId: user.buyerId,
    sellerId: user.sellerId,
    permissions: user.role.rolePermissions.map((permission) => permission.permissionName)
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(new TextEncoder().encode(JWT_SECRET));

  return token;
}

/**
 * Get JWT token from cookie
 * @returns The JWT token or null if not found
 */
export async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie ? cookie.value : null;
}

/**
 * Verify JWT token
 * @param token The JWT token to verify
 * @returns The payload if valid, null otherwise
 */
export async function verifyToken(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Get current user from token in cookie
 * 
 * This function retrieves the current user by extracting the JWT token from the browser cookies,
 * verifying the token, and then returning the payload which contains user information.
 * 
 * @returns {Promise<JwtUserPayload | null>} The current user payload if authenticated, or null if not authenticated.
 */
export async function getCurrentUser(): Promise<JwtUserPayload | null> {
  const token = await getTokenFromCookie();
  if (!token) return null;

  const payload = await verifyToken(token);
  return payload;
}