"use server"
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import type { UserWithPermission } from "@/schema/user";
import { COOKIE_NAME, JWT_EXPIRY } from "@/utils/constants";


export interface UserPayloadData {
  id: string;
  name: string;
  email: string;
  permissions: string[];
};

export interface JwtUserPayload extends UserPayloadData, JWTPayload { };

/**
 * Create JWT token with user info
 * @param user The user to create a token for
 * @returns The JWT token
 */
export async function createToken(user: UserWithPermission): Promise<string> {
  const payload: JwtUserPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    permissions: user.permissions.map(p => p.permissionName),
  };

  const JWT_SECRET = process.env.JWT_SEC as string;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

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
export async function verifyToken(token: string): Promise<JwtUserPayload | null> {
  try {

    const JWT_SECRET = process.env.JWT_SEC as string;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    return payload as JwtUserPayload;
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


export async function checkPermissions(permissions: string[], userPayload?: JwtUserPayload): Promise<boolean> {
  let user: JwtUserPayload | null | undefined = userPayload;
  if (!user) {
    user = await getCurrentUser();
  }
  if (!user) {
    throw new Error("User not authenticated");
  }
  const isAllowed = permissions.every(permission => user.permissions.includes(permission));
  return isAllowed;
}

export async function authorizeUser(permissions: string[]) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  const userPermissions = user.permissions;
  const missingPermissions = permissions.filter(permission => !userPermissions.includes(permission));

  if (missingPermissions.length > 0) {
    return { success: false, message: `Missing permissions: ${missingPermissions.join(", ")}` };
  }
  return { success: true, data: user, message: "User is authorized" };
}
