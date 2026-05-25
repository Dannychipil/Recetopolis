import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies }) => {
  try {
    cookies.delete("token", {path: "/"})
    return new Response(JSON.stringify({ message: "Logged out successfully" }), { status: 200 })
  } catch (error) {
    console.error("Error logging out:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
  }
}