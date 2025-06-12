import { NextResponse } from "next/server";

export function middleware(request) {
  const { cookies } = request;
  const accessToken = cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Allow Next.js internal routes and public assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/image") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Allow access to auth routes for unauthenticated users
  if (
    !accessToken &&
    (pathname === "/auth-page" ||pathname === "/otp-verify")
  ) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from signin page
  if (accessToken && pathname.startsWith("/auth-page")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users to signin
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth-page", request.url));
  }

  return NextResponse.next();
}
