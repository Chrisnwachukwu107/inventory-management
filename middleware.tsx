import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack/server";

export async function getCurrentUser() {
  const user = await stackServerApp.getUser();

  return (user);
};

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  const { pathname } = request.nextUrl;

  const isProtectedRoute =
    pathname === "/add-product" ||
    pathname === "/dashboard" ||
    pathname === "/inventory" ||
    pathname === "/settings";

  const isAuthRoute =
    pathname.startsWith("/handler") ||
    pathname === "/sign-in" ||
    pathname === "/sign-up";

  // Signed-in users should not see auth pages
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Signed-out users should not see protected pages
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/handler/:path*",
    "/sign-in",
    "/sign-up",
    "/add-product",
    "/dashboard",
    "/inventory",
    "/settings",
  ],
};
