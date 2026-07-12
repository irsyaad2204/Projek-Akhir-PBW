import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const roleRoutes: Record<string, string[]> = {
  SUPER_ADMIN: ["/super-admin"],
  ADMIN_RM: ["/admin-rm"],
  SUPERVISOR_PRODUKSI: ["/supervisor-produksi"],
  ADMIN_FG: ["/admin-fg"],
  MANAGER: ["/manager"],
};

export default auth((req: any) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Kalau belum login dan bukan di halaman login → redirect ke login
  if (!session && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Kalau sudah login dan akses halaman login → redirect ke dashboard
  if (session && pathname === "/login") {
    const role = session.user?.role as string;
    const redirectMap: Record<string, string> = {
      SUPER_ADMIN: "/super-admin",
      ADMIN_RM: "/admin-rm",
      SUPERVISOR_PRODUKSI: "/supervisor-produksi",
      ADMIN_FG: "/admin-fg",
      MANAGER: "/manager",
    };
    return NextResponse.redirect(
      new URL(redirectMap[role] || "/login", req.url)
    );
  }

  // Proteksi route per role
  if (session) {
    const role = session.user?.role as string;
    const allowedPrefixes = roleRoutes[role] || [];
    const isDashboardRoute = Object.values(roleRoutes)
      .flat()
      .some((r) => pathname.startsWith(r));

    if (isDashboardRoute) {
      const isAllowed = allowedPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
      );
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};