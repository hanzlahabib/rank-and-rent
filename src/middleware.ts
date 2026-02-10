import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Extract subdomain
  const appDomain = process.env.NEXT_PUBLIC_APP_URL?.replace(
    /https?:\/\//,
    ""
  ) || "localhost:3000";
  const subdomain = hostname.replace(`.${appDomain}`, "").replace(`:${url.port}`, "");

  // Admin routes - check for admin subdomain or /admin path
  if (subdomain === "admin" || hostname.startsWith("admin.")) {
    url.pathname = `/admin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // If there's a subdomain (not the root domain), treat it as a site slug
  if (subdomain && subdomain !== hostname && subdomain !== "localhost" && subdomain !== "www") {
    // Rewrite to the site route with the slug as a header
    const response = NextResponse.next();
    response.headers.set("x-site-slug", subdomain);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and _next
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
