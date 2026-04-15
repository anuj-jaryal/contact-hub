import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.hostname = 'digitaltoolcrate.com';
  return NextResponse.redirect(url, 301);
}

// Avoid running on static files
export const config = {
  matcher: [
    "/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};