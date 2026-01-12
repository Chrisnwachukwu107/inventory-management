import { NextRequest, NextResponse } from "next/server";
import { stackServerApp } from "./stack/server";

export async function middleware(request: NextRequest) {
  const user = await stackServerApp.getUser();
  const { pathname } = request.nextUrl;

  // If user is signed in and tries to access auth-related routes
  if (
    user &&
    (pathname.startsWith("/handler") ||
      pathname === "/sign-in" ||
      pathname === "/sign-up")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !user &&
    !(
      pathname.startsWith("/handler") ||
      pathname === "/sign-in" ||
      pathname === "/sign-up"
    )
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/handler/:path*", "/sign-in", "/sign-up"],
};
