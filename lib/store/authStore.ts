import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: "STUDENT" | "REGISTRAR" | "DEPARTMENT" | "ADMIN" | "PRESIDENT" | "TEACHER";
  department?: string;
  studentId?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (id: number, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
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

      login: async (id: number, password: string) => {
        try {
          set({ isLoading: true, error: null });

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id, password }),
            }
          );

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Failed to login");
          }

          const data = await response.json();

          set({
            user: data.user,
            token: data.token,
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

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
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
