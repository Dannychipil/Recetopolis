import type { APIRoute } from "astro"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import { User } from "@/models/Users"
import { signJwt } from "@/lib/jwt"

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, email, password } = await request.json()

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: "Username, email and password are required" }), { status: 400 })
    }

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({username, email, password: hashedPassword })
    await newUser.save()

    const token = signJwt({ userId: newUser._id })

    return new Response(JSON.stringify({ token }), { status: 201 })
  } catch (error) {
    console.error("Error registering user:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}  