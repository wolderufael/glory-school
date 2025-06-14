import { useAuthToken } from "@/lib/store/authStore";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

interface ApiError extends Error {
  status?: number;
}

export async function fetchApi(
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> {
  const { requireAuth = true, ...fetchOptions } = options;

  try {
    // Get the auth token
    const token = useAuthToken();

    // Construct the full URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${baseUrl}${endpoint}`;

    // Prepare headers
    const headers = new Headers(fetchOptions.headers);

    // Add default headers
    headers.set("Content-Type", "application/json");

    // Add auth token if required
    if (requireAuth) {
      if (!token) {
        throw new Error("Authentication required");
      }
      headers.set("Authorization", `Bearer ${token}`);
    }

    // Make the request
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // Handle non-2xx responses
    if (!response.ok) {
      const error: ApiError = new Error("API request failed");
      error.status = response.status;
      throw error;
    }

    // Parse and return the response
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    return response.text();
  } catch (error) {
    // Add any custom error handling here
    console.error("API request error:", error);
    throw error;
  }
}

// Helper function for GET requests
export function get(endpoint: string, options: FetchOptions = {}) {
  return fetchApi(endpoint, { ...options, method: "GET" });
}

// Helper function for POST requests
export function post(endpoint: string, data: any, options: FetchOptions = {}) {
  return fetchApi(endpoint, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Helper function for PUT requests
export function put(endpoint: string, data: any, options: FetchOptions = {}) {
  return fetchApi(endpoint, {
    ...options,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// Helper function for DELETE requests
export function del(endpoint: string, options: FetchOptions = {}) {
  return fetchApi(endpoint, { ...options, method: "DELETE" });
}
