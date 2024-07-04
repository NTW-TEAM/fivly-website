import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await fetch("http://localhost:3000/api/startup/check", {
    method: "GET",
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data)
  } else {
    console.error("Error fetching first start state");
  }

  const pathname = request.nextUrl.pathname;

/*   

  if (firstStart) {
    const firstStartChecked = await checkFirstStart();
    if (firstStartChecked) {
      return NextResponse.redirect(new URL("/startup", request.url));
    }
  } else if (pathname === "/startup" && !firstStart) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  } */

  const token = request.cookies.get("auth_token");

  const ignorePaths = [
    "/auth/signin",
    "/auth/signout",
    "/auth/signup",
    "/donation/give",
    "/api/stripe/create-donation-session",
    "/startup",
  ];

  if (
    pathname.startsWith("/_next/static/") ||
    pathname.startsWith("/images/")
  ) {
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