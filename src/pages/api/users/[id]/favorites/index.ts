import type { APIRoute } from 'astro'
import { connectDB } from '@/lib/db'
import { User } from '@/models/Users'
import { Recipe } from '@/models/Recipe'

// GET /api/users/[id]/favorites obtain favorite recipes of a user
export const GET: APIRoute = async ({ params }) => {
    try {
        await connectDB()

        const { id } = params

        // Find the user by ID and populate the favorites field
        const user = await User.findById(id).populate('favoriteRecipes')

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
        }

        return new Response(JSON.stringify(user.favoriteRecipes), { status: 200 })
    } catch (error) {
        console.error('Error fetching favorite recipes:', error)
        return new Response(JSON.stringify({ error: 'Error fetching favorite recipes' }), { status: 500 })
    }
} 

// POST /api/users/[id]/favorites add a recipe to user's favorites
export const POST: APIRoute = async ({ params, request }) => {
    try {
        await connectDB()

        const { id } = params
        const { recipeId } = await request.json()

        // Find the user by ID
        const user = await User.findById(id)

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
        }

        // Check if the recipe exists
        const recipe = await Recipe.findById(recipeId)
        if (!recipe) {
            return new Response(JSON.stringify({ error: 'Recipe not found' }), { status: 404 })
        }

        // Add the recipe to the user's favorites if it's not already there
        if (!user.favoriteRecipes.some((fav: any) => fav.toString() === recipeId)) {
            user.favoriteRecipes.push(recipeId)
            await user.save()
        }

        return new Response(JSON.stringify({ message: 'Recipe added to favorites' }), { status: 200 })
    } catch (error) {
        console.error('Error adding recipe to favorites:', error)
        return new Response(JSON.stringify({ error: 'Error adding recipe to favorites' }), { status: 500 })
    }
}