import type { APIRoute } from 'astro'
import { connectDB } from '@/lib/db'
import { User } from '@/models/Users'

export const POST: APIRoute = async ({ request }) => {
  try {
    await connectDB()
    const body = await request.json()
    const newUser = new User(body)
    await newUser.save()
    return new Response(JSON.stringify(newUser), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}