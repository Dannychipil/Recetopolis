import type { APIRoute } from "astro"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import { User } from "@/models/Users"
import { signJwt } from "@/lib/jwt"

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 })
    }

    const token = signJwt({ userId: user._id })

    cookies.set("token", token, {
      httpOnly: true,
      secure: import.meta.env.PROD, // Set secure flag in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return new Response(JSON.stringify({ token }), { status: 200 })
  } catch (error) {
    console.error("Error logging in:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}