import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Constructs a full URL for backend files
 * @param filePath - The relative file path from the backend
 * @returns The full URL to access the file
 */
export const getBackendFileUrl = (
  filePath: string | null | undefined
): string => {
  if (!filePath) return "/default-avatar.png";

  // If it's already a full URL, return as is
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  // If it's a relative path, prepend the backend URL
  if (filePath.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL}${filePath}`;
  }

  // Fallback
  return filePath;
};
