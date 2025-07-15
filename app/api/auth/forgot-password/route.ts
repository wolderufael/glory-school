import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { mainId } = await request.json();

    if (!mainId) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Forward the request to your backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/forgot-password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mainId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to send reset instructions" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      message: "Password reset instructions sent successfully",
      data,
    });
  } catch (error) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
