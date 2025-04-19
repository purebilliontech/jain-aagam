import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { COOKIE_NAME } from "@/utils/constants";

export async function middleware(request: NextRequest) {
    // Get the token from cookies
    const cookieToken = request.cookies.get(COOKIE_NAME);

    if (!cookieToken?.value) {
        // Redirect to login page if no token is found
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    try {
        // Verify the token
        const tokenData = await verifyToken(cookieToken.value);

        if (!tokenData) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        // Redirect to login if token verification fails
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: [
        "/admin/:path*"
    ],
};


