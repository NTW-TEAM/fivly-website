import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

export async function middleware(request: NextRequest) {
  const debug = false;
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token");
  const ignorePaths = [
    "/auth/signin",
    "/auth/signout",
    "/auth/signup",
    "/donation/give",
    "/api/stripe/create-donation-session",
    "/api/users/register-admin",
    "/api/association",
    "/startup",
    "/favicon.ico",
  ];

  if (debug) console.log("debut: ", pathname)

  if (pathname.startsWith("/_next/static/") || pathname.startsWith("/images/")) {
    if (debug) console.log("static: ", pathname);
    return NextResponse.next();
  }

  if (!pathname.includes("/startup") && !pathname.startsWith("/api/")) {
    if (debug) console.log("startup: ", pathname);
    const response = await fetch("http://inclinus.fr:3189/users/firstStart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      //firstStart
      if (debug) console.log("firstStart: ", pathname);
      return NextResponse.redirect(new URL("/startup", request.url));
    }
  }

  if (!token && !ignorePaths.includes(pathname)) {
    if (debug) console.log("signin: ", pathname);
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (pathname === "/auth/logout") {
    if (debug) console.log("logout: ", pathname);
    const response = NextResponse.redirect(
      new URL("/auth/signin", request.url),
    );
    response.cookies.delete("auth_token");
    return response;
  }

  if (debug) console.log("fin: ", pathname);

  return NextResponse.next();
}
