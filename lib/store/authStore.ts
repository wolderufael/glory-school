import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAccepted: any;
  login: (mainId: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAccepted: null,
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: (user) =>
        set(() => ({
          user,
          isAuthenticated: !!user,
        })),

      setToken: (token) => set(() => ({ token })),

      setError: (error) => set(() => ({ error })),

      setLoading: (isLoading) => set(() => ({ isLoading })),

      login: async (mainId: string, password: string) => {
        try {
          set({ isLoading: true, error: null });

          // Hardcoded accounts for development/demo while backend is not ready
          const accounts: Array<{
            mainId: string;
            password: string;
            user: User & { userType: string; userMainId?: string };
            extras?: Record<string, string>;
          }> = [
            {
              mainId: "student01",
              password: "password123",
              user: {
                id: 1,
                firstName: "Student",
                lastName: "One",
                role: "STUDENT",
                userMainId: "UGR/0001/12",
                userType: "Student",
              },
              extras: {
                currentStudyingYear: "1",
                currentStudyingSemester: "1",
                currentStudyingLevel: "I",
                departmentId: "10",
              },
            },
            {
              mainId: "registrar01",
              password: "password123",
              user: {
                id: 2,
                firstName: "Reg",
                lastName: "Istrar",
                role: "REGISTRAR",
                userMainId: "REG/0001/12",
                userType: "Registrar",
              },
            },
            {
              mainId: "teacher01",
              password: "password123",
              user: {
                id: 3,
                firstName: "Teach",
                lastName: "Er",
                role: "TEACHER",
                userMainId: "TCH/0001/12",
                userType: "Teacher",
              },
            },
            {
              mainId: "department01",
              password: "password123",
              user: {
                id: 4,
                firstName: "Dept",
                lastName: "User",
                role: "DEPARTMENT",
                userMainId: "DPT/0001/12",
                userType: "Department",
              },
            },
            {
              mainId: "parent01",
              password: "password123",
              user: {
                id: 5,
                firstName: "Parent",
                lastName: "User",
                role: "PARENT",
                userMainId: "PRT/0001/12",
                userType: "Parent",
              },
              extras: {
                parentId: "101",
              },
            },
          ];

          const match = accounts.find(
            (a) => a.mainId === mainId && a.password === password
          );

          if (!match) {
            throw new Error("Invalid credentials");
          }

          const user = match.user;

          // Store in localStorage (simulating what backend would return)
          if (typeof window !== "undefined") {
            // Academic context placeholders
            localStorage.setItem("academicYearId", "2025");
            localStorage.setItem("academicYearName", "AY 2024/25");
            localStorage.setItem("academicSemesterId", "1");
            localStorage.setItem("academicSemesterName", "Semester I");

            // Role-specific extras
            if (match.extras) {
              for (const [k, v] of Object.entries(match.extras)) {
                localStorage.setItem(k, v);
              }
            }

            // Common
            localStorage.setItem("currentUserId", String(user.id));
            localStorage.setItem("userType", user.userType || "");
            localStorage.setItem("userId", String(user.id));
            localStorage.setItem("userMainId", user.userMainId || "");

            // For student-only convenience values (if not provided in extras)
            if (user.userType === "Student") {
              localStorage.setItem(
                "currentStudyingYear",
                match.extras?.currentStudyingYear || "1"
              );
              localStorage.setItem(
                "currentStudyingSemester",
                match.extras?.currentStudyingSemester || "1"
              );
              localStorage.setItem(
                "currentStudyingLevel",
                match.extras?.currentStudyingLevel || "I"
              );
              if (match.extras?.departmentId) {
                localStorage.setItem("departmentId", match.extras.departmentId);
              }
            }

            // Mark as registered for demo
            localStorage.setItem("isRegistered", "Yes");
          }

          // Create a simple unsigned JWT-like token so middleware treats the user as authenticated
          const base64UrlEncode = (obj: any) =>
            typeof window !== "undefined"
              ? btoa(JSON.stringify(obj))
                  .replace(/\+/g, "-")
                  .replace(/\//g, "_")
                  .replace(/=+$/g, "")
              : Buffer.from(JSON.stringify(obj))
                  .toString("base64")
                  .replace(/\+/g, "-")
                  .replace(/\//g, "_")
                  .replace(/=+$/g, "");

          const nowSec = Math.floor(Date.now() / 1000);
          const header = { alg: "none", typ: "JWT" };
          const payload = {
            userType: user.userType,
            userId: String(user.id),
            exp: nowSec + 7 * 24 * 60 * 60,
            iat: nowSec,
            isRegisteredStudent: user.userType === "Student" ? true : false,
          };
          const token = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}.mock`;

          // Set cookie via API route
          await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "An error occurred during login",
          });
          throw error;
        }
      },

      logout: async () => {
        // Clear localStorage items
        if (typeof window !== "undefined") {
          localStorage.clear();
        }

        // Clear the Zustand store state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });

        // Navigate to login page (client-side only)
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      },
    }),
    {
      name: "auth-storage",
      // Only persist these fields
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Helper hook to get user role
export const useUserRole = () => {
  return useAuthStore((state) => state.user?.role);
};

// Helper hook to get auth token
export const useAuthToken = () => {
  return useAuthStore((state) => state.token);
};

// Helper hook to check if user is authenticated
export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated);
};
