import {
  checkStudentRegistration,
  isAcceptedStudent,
} from "@/utils/checkregistration";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role:
    | "STUDENT"
    | "REGISTRAR"
    | "DEPARTMENT"
    | "ADMIN"
    | "PRESIDENT"
    | "TEACHER";
  department?: string;
  userMainId?: string;
  studentId?: string;
  userType?: string;
}

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
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/login/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ mainId, password }),
            }
          );

          if (!response.ok) {
            throw new Error("Login failed");
          }

          const data = await response.json();
          const { token, user, academicYear, academicSemester } = data;

          console.log("user123", user);

          //if (user.userType === "Student") { }

/*           const isRegistered = (await checkStudentRegistration(user.userMainId))
            ? "Yes"
            : "No"; */
          const isRegistered = (await checkStudentRegistration(user))
            ? "Yes"
            : "No";

/*           const isAccepted = (await isAcceptedStudent(
            user.userMainId,
            academicYear?.id?.toString()
          ))
            ? "Yes"
            : "No";  */


          // Set cookie
          await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
          // Store in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "academicYearId",
              academicYear?.id?.toString() || ""
            );
            localStorage.setItem("academicYearName", academicYear?.name || "");
            localStorage.setItem(
              "academicSemesterId",
              academicSemester?.id?.toString() || ""
            );
            localStorage.setItem(
              "academicSemesterName",
              academicSemester?.name || ""
            );
            if (user.userType === "Student") {
              localStorage.setItem(
                "currentStudyingYear",
                user?.student?.currentStudyingYear
              );
              localStorage.setItem(
                "currentStudyingSemester",
                user?.student?.currentStudyingSemester
              );
              localStorage.setItem(
                "currentStudyingLevel",
                user?.student?.currentStudyingLevel
              );
            }
            localStorage.setItem("currentUserId", user?.id?.toString() || "");
            localStorage.setItem("userType", user?.userType || "");
            localStorage.setItem(
              "userId",
              user?.id?.toString() || ""
            );
            localStorage.setItem(
              "studentId",
              user?.student?.id?.toString() || ""
            );
            localStorage.setItem(
              "registrarId",
              user?.registrar?.id?.toString() || ""
            );
            localStorage.setItem(
              "teacherId",
              user?.teacher?.id?.toString() || ""
            );
            localStorage.setItem(
              "departmentUserId",
              user?.departmentUser?.id?.toString() || ""
            );
            localStorage.setItem(
              "departmentId",
              user?.departmentUser?.departmentId?.toString() || ""
            );
            localStorage.setItem(
              "presidentId",
              user?.president?.id?.toString() || ""
            );
            localStorage.setItem("userMainId", user?.userMainId || "");
             localStorage.setItem("isRegistered", isRegistered);
            //localStorage.setItem("isAccepted", isAccepted); 
          }

          set({
            //isAccepted,
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
        // 1. Clear the HTTP-only cookie
        await fetch("/api/auth/logout", {
          method: "POST",
        });

        // 2. Clear localStorage items
        localStorage.clear();

        // 3. Clear the Zustand store state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });

        // 4. Navigate to login page
        window.location.href = "/auth/login";
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
