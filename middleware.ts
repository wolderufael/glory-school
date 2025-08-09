import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dayjs from "dayjs";
import { decrypt } from "./utils/generateToken";
import { checkStudentRegistration } from "./utils/checkregistration";



export type UserEnumTypes =
  | "Student"
  | "Teacher"
  | "Registrar"
  | "Department"
  | "President"
  | "Parent";

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
  Student: "/student/dashboard",
  Teacher: "/teacher",
  Registrar: "/registrar",
  Department: "/department",
  President: "/president",
  Parent: "/parent",
};

// Protected routes per role
const roleRoutes: Record<UserEnumTypes, string[]> = {
  Student: ["/student"],
  Teacher: ["/teacher"],
  Registrar: ["/registrar"],
  Department: ["/department"],
  President: ["/president"],
  Parent: ["/parent"],
};

const loginUrls = ["/auth/login", "/auth/register"];
const protectedRoutes = Object.values(roleRoutes).flat();

// Temporary function to check student registration, for real implementation need user id(not maniID) from the token
//NOTE: we need an endpoint to check the student registration status by MainID
// For testing purposes, i am using filtering 
/* async function checkStudentRegistration(userId: string, baseUrl: string) {
  try {
    // fetch user id first
    const userIDdata = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const userIDData = await userIDdata.json();
    const userId1 = userIDData.id;
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    const userData = await user.json();
    console.log("Checking registration for user:", userId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/students/${userId}`,
      {
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.log("Registration check failed:", response.status);
      return false;
    }

    const data = await response.json();
    console.log("Registration data:", data);
    return Array.isArray(data) ? data.length > 0 : false;
  } catch (error) {
    console.error("Failed to check student registration:", error);
    return false;
  }
} */

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const BASE_URL = req.nextUrl.origin;
  const PATH = req.nextUrl.pathname;

  console.log("Middleware running for path:", PATH);

  let isAuthenticated = false;
  let userRole: UserEnumTypes = "Student";
  let userId: string | null = null;
  let isRegisteredStudent = false;

  const buildUrl = (route: string) => new URL(route, BASE_URL).toString();

  // Try to decrypt the session token
  const token = req.cookies.get("session")?.value;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded token:", decoded);

      if (decoded && typeof decoded === "object") {
        const user = decoded as any;
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          isAuthenticated = true;
          userRole = user.userType;
          userId = user.userId;
          isRegisteredStudent = user.isRegisteredStudent;
          console.log("User authenticated:", { userRole, userId });
        } else {
          return NextResponse.redirect(buildUrl("/auth/login"));
        }
      }
    } catch (err) {
      console.error("JWT decryption error in middleware:", err);
      return NextResponse.redirect(buildUrl("/auth/login"));
    }
  }

  // Helper to match protected routes
  const isInRoutes = (routes: string[], path: string) =>
    routes.some((route) => path.startsWith(route));

  // Block unauthenticated access
  if (!isAuthenticated && isInRoutes(protectedRoutes, PATH)) {
    return NextResponse.redirect(buildUrl("/auth/login"));
  }

  // Prevent logged-in users from accessing login/register pages
  if (isAuthenticated && isInRoutes(loginUrls, PATH)) {
    return NextResponse.redirect(buildUrl(DASHBOARDS[userRole]));
  }

  // Handle student registration routing
  if (isAuthenticated && userRole === "Student" && userId) {
    console.log("Checking student registration status");
    //await delay(60000);
    //const isRegistered = await checkStudentRegistration(userId);
    //const isRegistered = false;
    const isRegistered = isRegisteredStudent;
    console.log("Registration check result:", isRegistered)

    // If student is not registered
    if (!isRegistered) {
      console.log("Student not registered, redirecting to registration");
      // Allow access only to registration page
      if (!PATH.startsWith("/student/registration")) {
        return NextResponse.redirect(buildUrl("/student/registration"));
      }
    } else {
      console.log("Student is registered, checking current path");
      // If student is registered
      if (PATH === "/student/registration") {
        return NextResponse.redirect(buildUrl("/student/dashboard"));
      }
    }
  }

  // Prevent access to routes not meant for their role
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
