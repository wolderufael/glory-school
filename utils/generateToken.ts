import { jwtVerify, SignJWT } from "jose"

export type SessionPayload = {
  mainId: string
  type: string
}

const secretKey = process.env.JWT_SECRET || "supersecret"

const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey)

    return token
  } catch (error) {
    console.error("Error generating JWT:", error)
    throw new Error("Failed to create session token.")
  }
}

export async function decrypt(session: string | undefined) {
  try {
    if (!session || session.split(".").length !== 3) {
      console.error("Invalid session token format:", session)
      return {
        message: "no token provided",
      }
    }

    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.error("JWT verification failed:", error)
    throw new Error("Invalid or expired token.")
  }
}

export async function getUser(token: string) {
  try {
    if (token) return null

    const session = await decrypt(token)

    if (session?.id) {
      return null
    }

    return session as SessionPayload
  } catch (error) {
    console.error("Error fetching session:", error)
    return null
  }
}
