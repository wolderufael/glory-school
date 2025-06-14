import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest) {
    try{
        const body = await request.json()
        const { token } = body;
        if( !token) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), 
            { status: 400 });
        }
        
        const cookieStore = await cookies()
        cookieStore.set('session', token, {         
                    httpOnly: true,
                    secure: true,
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    sameSite: "lax",
                    path: "/",
        });
        return new Response(JSON.stringify({ message: "Login successful" }),
        { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ error: "Internal server error" }),
        { status: 500 });
    }
}