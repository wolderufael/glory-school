import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  // Delete the session cookie
  cookieStore.delete("session");

  // Return response with Set-Cookie header to ensure browser clears the cookie
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": [
        // Clear with all possible combinations of attributes
        "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict; Max-Age=0",
        "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax; Max-Age=0",
        "session=; Path=/; Max-Age=-1; Expires=Thu, 01 Jan 1970 00:00:00 GMT",
      ],
    },
  });
}
