import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  publicRoutes,
  adminRoutes,
  helperRoutes,
  customerRoutes,
} from "@/app/utils/routes";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;
  const role = request.cookies.get("role")?.value;

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route || (route !== "/" && pathname.startsWith(route)),
  );

  // Auth pages (login/register)
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/admin/login";

  // Role-based routes
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isHelperRoute = helperRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isCustomerRoute = customerRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // 1. If logged in and trying to access auth pages, redirect to dashboard
  if (isAuthPage && token) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else if (role === "helper") {
      return NextResponse.redirect(new URL("/helper/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/customer/dashboard", request.url));
    }
  }

  // 2. If it's a public route, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 3. If NOT logged in and trying to access protected route
  if (!token) {
    const searchParams = new URLSearchParams(request.nextUrl.search);
    searchParams.set("from", pathname);

    // Determine which login to go to
    const loginPath = isAdminRoute ? "/admin/login" : "/login";
    return NextResponse.redirect(
      new URL(`${loginPath}?${searchParams.toString()}`, request.url),
    );
  }

  // 4. Role-based enforcement
  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isHelperRoute && role !== "helper") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isCustomerRoute && role !== "customer") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - assets (public assets)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};
