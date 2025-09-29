import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ["/dashboard", "/profile", "/settings"]
const guestOnlyRoutes = ["/", "/auth/signup", "/login"]

export function middleware(req: NextRequest) {
        const token = req.cookies.get("access_token")?.value
        const { pathname } = req.nextUrl

        if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
                return NextResponse.redirect(new URL("/", req.url))
        }

        if (guestOnlyRoutes.includes(pathname) && token) {
                return NextResponse.redirect(new URL("/dashboard", req.url))
        }

        return NextResponse.next()
}

export const config = {
        matcher: [
                "/dashboard/:path*",
                "/profile/:path*",
                "/settings/:path*",
                "/login",
                "/auth/signup",
                "/",
        ],
}
