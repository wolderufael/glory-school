import { deleteCookie, hasCookie } from "cookies-next";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export type UserEnumTypes = "STUDENT" | "TEACHER" | "REGISTRAR" | "DEPARTMENT" | "PRESIDENT";

export type Tokens = {
  access: string;
  refresh?: string;
};

export type UserTypePayload = {
  accountType: UserEnumTypes;
  accountid: string;
  exp: number;
  firstName?: string;
  iat: number;
  lastName?: string;
  updatedAt: string;
};

// Define dashboard entry points for each role
const DASHBOARDS: Record<UserEnumTypes, string> = {
  STUDENT: "/student",
  TEACHER: "/teacher",
  REGISTRAR: "/registrar",
  DEPARTMENT: "/department",
  PRESIDENT: "/president",
};

// Define protected routes per role
const roleRoutes: Record<UserEnumTypes, string[]> = {
  STUDENT: ["/student"],
  TEACHER: ["/teacher"],
  REGISTRAR: ["/registrar"],
  DEPARTMENT: ["/department"],
  PRESIDENT: ["/president"],
};

const loginUrls = ["/auth/login", "/auth/register"];
const protectedRoutes = Object.values(roleRoutes).flat();

export default function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const BASE_URL = req.nextUrl.origin;
  const PATH = req.nextUrl.pathname;

  console.log("Cookies in middleware:", req.cookies.getAll());

  let isAuthenticated = false;
  let userRole: UserEnumTypes = "STUDENT";

  const buildUrl = (route: string) => new URL(route, BASE_URL).toString();

  // Check for the presence of the session cookie
  if (hasCookie("session", { cookies })) {
    const rawTokens = req.cookies.get("session")?.value;

    if (rawTokens) {
      try {
        // Decode the JWT token to get user information
        const user = jwtDecode(rawTokens) as UserTypePayload;
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1; // Check if token is expired

        console.log("Decoded User:", user);
        console.log("Token Expiration Check:", isExpired);

        if (!isExpired) {
          isAuthenticated = true; // User is authenticated
          userRole = user.accountType; // Get user role
        } else {
          // Token expired, delete it
          console.log("Token expired, deleting cookie.");
          deleteCookie("session");
        }
      } catch (err) {
        console.error("JWT Decode Error:", err);
        deleteCookie("session"); // On error, delete the cookie
      }
    }
  }

  // Utility function to check if a route belongs to a group
  const isInRoutes = (routes: string[], path: string) => {
    return routes.some((route) => path.startsWith(route));
  };

  // Block unauthenticated users from protected routes
  if (!isAuthenticated && isInRoutes(protectedRoutes, PATH)) {
    return NextResponse.redirect(buildUrl("/auth/login"));
  }

  // Redirect authenticated users accessing login pages
  if (isAuthenticated && isInRoutes(loginUrls, PATH)) {
    return NextResponse.redirect(buildUrl(DASHBOARDS[userRole]));
  }

  // Redirect user if they're accessing a route not meant for their role
  if (isAuthenticated && isInRoutes(protectedRoutes, PATH)) {
    const allowedRoutes = roleRoutes[userRole];

    if (!isInRoutes(allowedRoutes, PATH)) {
      return NextResponse.redirect(buildUrl(DASHBOARDS[userRole]));
    }
  }

  return res; // Return response
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|public).*)"], // Match all routes except public/assets/api
};




// import { deleteCookie, hasCookie } from "cookies-next";
// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import { cookies } from "next/headers";
// import dayjs from "dayjs";
// import { jwtDecode } from "jwt-decode";


// export type UserEnumTypes = "STUDENT" | "TEACHER" | "REGISTRAR" | "DEPARTMENT" | "PRESIDENT";

// export type Tokens = {
//   access: string;
//   refresh?: string;
  
// };

// export type UserTypePayload = {
//   accountType: UserEnumTypes;
//   accountid: string;
//   exp: number;
//   firstName?: string;
//   iat: number;
//   lastName?: string;
//   updatedAt: string;
// };

// // Define dashboard entry points for each role
// const DASHBOARDS: Record<UserEnumTypes, string> = {
//   STUDENT: "/student",
//   TEACHER: "/teacher",
//   REGISTRAR: "/registrar",
//   DEPARTMENT: "/department",
//   PRESIDENT: "/president",
// };

// // Define protected routes per role
// const roleRoutes: Record<UserEnumTypes, string[]> = {
//   STUDENT: ["/student"],
//   TEACHER: ["/teacher"],
//   REGISTRAR: ["/registrar"],
//   DEPARTMENT: ["/department"],
//   PRESIDENT: ["/president"],
// };

// const loginUrls = ["/auth/login", "/auth/register"];


// const protectedRoutes = Object.values(roleRoutes).flat();

// export default function middleware(req: NextRequest) {
//   const res = NextResponse.next();
//   const BASE_URL = req.nextUrl.origin;
//   const PATH = req.nextUrl.pathname;


//   console.log("Cookies in middleware:", req.cookies.getAll());

//   console.log('cookies ', req.cookies.get('session')?.value )
  
//   let isAuthenticated = false;
//   let userRole: UserEnumTypes = "STUDENT";

//   const buildUrl = (route: string) => new URL(route, BASE_URL).toString();



 
//   if (hasCookie("token", { cookies })) {
//     const rawTokens = req.cookies.get("token")?.value;

//    if (rawTokens) {
//             try {
//                 const user = jwtDecode(rawTokens) as UserTypePayload;
//                 const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//                 console.log("Decoded User:", user);
//                 console.log("Token Expiration Check:", isExpired);
//                 if (!isExpired) {
//                 isAuthenticated = true;
//                 userRole = user.accountType;
//                 } else {
//                 req.cookies.delete("token");
//                 deleteCookie("token");
//                 }
//             } catch (err) {
//                 console.error("JWT Decode Error:", err);
//                 req.cookies.delete("token");
//                 deleteCookie("token");
//             }
//             }

//   }

//   // Utility: check if route belongs to a group
//   const isInRoutes = (routes: string[], path: string) => {
//     return routes.some((route) => path.startsWith(route));
//   };

//   // Block unauthenticated users from protected routes
//   if (!isAuthenticated && isInRoutes(protectedRoutes, PATH)) {
//     return NextResponse.redirect(buildUrl("/auth/login"));
//   }

//   // Redirect authenticated users accessing login pages
//   if (isAuthenticated && isInRoutes(loginUrls, PATH)) {
//     return NextResponse.redirect(buildUrl(DASHBOARDS[userRole]));
//   }

//   // Redirect user if they're accessing a route not meant for their role
//   if (isAuthenticated && isInRoutes(protectedRoutes, PATH)) {
//     const allowedRoutes = roleRoutes[userRole];

//     if (!isInRoutes(allowedRoutes, PATH)) {
//       return NextResponse.redirect(buildUrl(DASHBOARDS[userRole]));
//     }
//   }

//   return res;
// }

// export const config = {
//   matcher: ["/((?!_next|favicon.ico|api|public).*)"], // Match all routes except public/assets/api
// };
