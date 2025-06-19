import { clearLocalStorage } from "./localStorage";

export const handleLogout = async () => {
  try {
    // Call the dedicated logout endpoint
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include", // Important for cookie handling
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    // Clear all localStorage items
    clearLocalStorage();

    // Wait a bit to ensure cookie is cleared
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Force a complete page reload and redirect
    window.location.href = "/";
  } catch (error) {
    console.error("Logout error:", error);
    // Fallback: force reload
    window.location.href = "/";
  }
};
