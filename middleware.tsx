import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack/server";

export async function getCurrentUser() {
  const user = await stackServerApp.getUser();

  return (user);
};

export async function middleware(request: NextRequest) {
  const user = await getCurrentUser();
  const { pathname } = request.nextUrl;

  const isProtectedRoute = [
    // "/dashboard",
    // "/add-product",
    // "/inventory",
    // "/settings",
  ].some((route) => pathname.startsWith(route));

  const isAuthRoute = [
    "/",
    "/handler/sign-in",
    "/handler/sign-up",
    "/sign-in",
    "/sign-up",
  ].some((route) => pathname === route);

  // Signed-in users should not see auth pages
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Signed-out users should not see protected pages
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/handler/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/handler/:path*",
    "/sign-in",
    "/sign-up",
    "/add-product",
    "/dashboard",
    "/inventory",
    "/settings",
  ],
};
