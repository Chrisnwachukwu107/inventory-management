import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack/server";

export async function middleware(request: NextRequest) {
  const user = await stackServerApp.getUser();
  const { pathname } = request.nextUrl;

  const isProtectedRoute = [
    "/dashboard",
    "/add-product",
    "/inventory",
    "/settings",
  ].some((route) => pathname.startsWith(route));

  const isAuthRoute =
    pathname.startsWith("/handler") ||
    pathname === "/sign-in" ||
    pathname === "/sign-up";

  // ✅ Signed-in users should never see auth pages OR root
  if (user && (isAuthRoute || pathname === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 🚫 Signed-out users cannot see protected pages
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/handler/:path*",
    "/sign-in",
    "/sign-up",
    "/dashboard/:path*",
    "/add-product",
    "/inventory",
    "/settings",
  ],
};
