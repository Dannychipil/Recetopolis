import type { APIRoute } from 'astro'
import { connectDB } from '@/lib/db'
import { User } from '@/models/Users'

export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB()
    const user = await User.findById(params.id).select('-password')
    if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching users:', error)
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}       

export const PUT: APIRoute = async ({ request, params }) => {
  try {
    await connectDB()
    const body = await request.json()
    const user = await User.findByIdAndUpdate(params.id, body, { new: true }).select('-password')
    if (!user) return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 })
    return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return new Response(JSON.stringify({ error: 'Failed to update user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}