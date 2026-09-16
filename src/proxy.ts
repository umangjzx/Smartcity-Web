import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/adminAuth";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isAuthApiRoute(pathname: string) {
  return pathname === "/api/admin/login" || pathname === "/api/admin/logout";
}

// The contact form must be submittable by any visitor, so its POST is the one
// write endpoint exempt from the "all writes need admin auth" rule below. Its
// GET is the opposite case: it lists visitor names/emails/messages, so unlike
// every other GET route it must NOT be publicly readable — protect it explicitly.
function isPublicContactSubmit(pathname: string, method: string) {
  return pathname === "/api/contact" && method === "POST";
}

function isProtectedContactRead(pathname: string, method: string) {
  return pathname === "/api/contact" && method === "GET";
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (isAuthApiRoute(pathname)) return;

  const needsAuth =
    isAdminRoute(pathname) ||
    isProtectedContactRead(pathname, req.method) ||
    (pathname.startsWith("/api") && !SAFE_METHODS.has(req.method) && !isPublicContactSubmit(pathname, req.method));
  if (!needsAuth) return;

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authenticated = await verifySessionToken(token);
  if (authenticated) return;

  if (pathname.startsWith("/api")) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin-login", req.url);
  loginUrl.searchParams.set("redirect_url", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
