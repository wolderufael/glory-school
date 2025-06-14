import { useAuthToken } from "@/lib/store/authStore";

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

interface ApiError extends Error {
  status?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchApi(
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> {
  const { requireAuth = true, ...fetchOptions } = options;

  try {
    // Get the auth token
    const token = useAuthToken();

    // Construct the full URL
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${API_BASE_URL}${endpoint}`;

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
export async function get(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Helper function for POST requests
export async function post(endpoint: string, data: any) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Helper function for PUT requests
export async function put(endpoint: string, data: any) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Helper function for DELETE requests
export async function del(endpoint: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}
