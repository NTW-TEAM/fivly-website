import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/_next/static/") || pathname.startsWith("/images/")) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/auth/signin" && pathname !== "/auth/signout" && pathname !== "/auth/signup") {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname === "/auth/logout") {
    const response = NextResponse.redirect(
      new URL("/auth/signin", request.url),
    );
    response.cookies.delete("auth_token");
    return response;
  }

  return NextResponse.next();
}
