import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, verifyToken } from "@/lib/auth";
import type { JwtUserPayload } from "@/lib/auth";

/**
 * Check if the path is a public path that doesn't require authentication
 * @param pathname The path to check
 * @returns Whether the path is public
 */
export function isPublicPath(pathname: string): boolean {
  const publicPaths = ["/auth/login", "/auth/register"];
  return publicPaths.some(path => pathname.startsWith(path));
}

/**
 * Check if the path is an API route
 * @param pathname The path to check
 * @returns Whether the path is an API route
 */
export function isApiRoute(pathname: string): boolean {
  return pathname.startsWith("/api");
}

/**
 * Get the authentication token from the request
 * @param request The NextRequest object
 * @returns The authentication token, if present
 */
export function getAuthToken(request: NextRequest): string | undefined {
  return request.cookies.get("auth-token")?.value;
}

/**
 * Create a redirect response to the login page
 * @param request The NextRequest object
 * @returns A NextResponse redirecting to the login page
 */
export function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/auth/login", request.url);
  return NextResponse.redirect(loginUrl);
}

/**
 * Authentication middleware
 * Checks if the user is authenticated and redirects to login if not
 * @param request The NextRequest object
 * @returns A NextResponse
 */
export async function authMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  // For API routes, let them handle their own authentication
  if (isApiRoute(pathname)) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = getAuthToken(request);

  // If no token, redirect to login
  if (!token) {
    return redirectToLogin(request);
  }

  // Verify token
  const payload = await verifyToken(token);

  // If token is invalid, redirect to login
  if (!payload) {
    return redirectToLogin(request);
  }

  // Token is valid, proceed to the route
  return NextResponse.next();
}

/**
 * Check if the current user has the specified permissions
 * @param permissions The permissions to check for (checks if user has ANY of these)
 * @returns A boolean indicating whether the user has any of the specified permissions
 * @throws Error if user is not authenticated
 */
export async function checkPermission(permissions: string[]): Promise<boolean> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return permissions.some(permission => user.permissions.includes(permission));
}

/**
 * Check if the current user has ALL of the specified permissions
 * @param permissions The permissions to check for (checks if user has ALL of these)
 * @returns A boolean indicating whether the user has all the specified permissions
 * @throws Error if user is not authenticated
 */
export async function checkAllPermissions(permissions: string[]): Promise<boolean> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return permissions.every(permission => user.permissions.includes(permission));
}

