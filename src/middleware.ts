import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");
  const pathname = request.nextUrl.pathname;

  const ignorePaths = ["/auth/signin", "/auth/signout", "/auth/signup", "/donation/give"];

  if (pathname.startsWith("/_next/static/") || pathname.startsWith("/images/")) {
    return NextResponse.next();
  }

  if (!token && !ignorePaths.includes(pathname)) {
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
