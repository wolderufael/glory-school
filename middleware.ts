import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dayjs from "dayjs";
import { decrypt } from "./utils/generateToken";

export type UserEnumTypes = "STUDENT" | "TEACHER" | "REGISTRAR" | "DEPARTMENT" | "PRESIDENT";

export type UserTypePayload = {
  accountType: UserEnumTypes;
  accountid: string;
  exp: number;
  iat: number;
  updatedAt: string;
  firstName?: string;
  lastName?: string;
};

// Dashboard redirect map
const DASHBOARDS: Record<UserEnumTypes, string> = {
  STUDENT: "/student",
  TEACHER: "/teacher",
  REGISTRAR: "/registrars",
  DEPARTMENT: "/department",
  PRESIDENT: "/president",
};

// Protected routes per role
const roleRoutes: Record<UserEnumTypes, string[]> = {
  STUDENT: ["/student"],
  TEACHER: ["/teacher"],
  REGISTRAR: ["/registrars"],
  DEPARTMENT: ["/department"],
  PRESIDENT: ["/president"],
};

const loginUrls = ["/auth/login", "/auth/register"];
const protectedRoutes = Object.values(roleRoutes).flat();

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const BASE_URL = req.nextUrl.origin;
  const PATH = req.nextUrl.pathname;

  let isAuthenticated = false;
  let userRole: UserEnumTypes = "STUDENT";

  const buildUrl = (route: string) => new URL(route, BASE_URL).toString();

  // ✅ Try to decrypt the session token
  const token = req.cookies.get("session")?.value;

  if (token) {
    try {

      console.log("JWT token found:", token);

       const decoded = JSON.parse(atob(token.split('.')[1])); 

    console.log("Decoded token:", decoded);
    
    const accountType = decoded.userType as any;


      if (decoded && typeof decoded === "object") {
        const user = decoded as any;

        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          isAuthenticated = true;
          userRole = user.accountType;
        } else {
          console.warn("Session expired.");
        }
      }
    } catch (err) {
      console.error("JWT decryption error in middleware:", err);
    }
  }

  // Helper to match protected routes
  const isInRoutes = (routes: string[], path: string) =>
    routes.some((route) => path.startsWith(route));

  // 🚫 Block unauthenticated access
  if (!isAuthenticated && isInRoutes(protectedRoutes, PATH)) {
    return NextResponse.redirect(buildUrl("/auth/login"));
  }

  // 🚫 Prevent logged-in users from accessing login/register pages
  if (isAuthenticated && isInRoutes(loginUrls, PATH)) {
    return NextResponse.redirect(buildUrl(DASHBOARDS[userRole]));
  }

  // 🚫 Prevent access to routes not meant for their role
  if (isAuthenticated && isInRoutes(protectedRoutes, PATH)) {
    const allowedRoutes = roleRoutes[userRole];
    if (!isInRoutes(allowedRoutes, PATH)) {
      return NextResponse.redirect(buildUrl(DASHBOARDS[userRole]));
    }
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|public).*)"],
};
