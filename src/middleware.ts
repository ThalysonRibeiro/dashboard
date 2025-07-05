import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "./lib/cookieServer";
import serverApi from "./lib/serverApi";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname === "/") {
    return NextResponse.next();
  }
  const accessToken = await getCookieServer();

  if (pathname.startsWith("/admin")) {
    if (!accessToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const isValidToken = await validateAccessToken(accessToken);
    if (!isValidToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
}

async function validateAccessToken(token: string) {
  if (!token) return false;
  try {
    await serverApi.get("/auth/validate-token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;

  } catch {
    return false;
  }
}