import type { APIRoute } from 'astro'
import { connectDB } from '@/lib/db'
import { User } from '@/models/Users'


// DELETE /api/users/[id]/favorites/[recipeId] remove a recipe from user's favorites
export const DELETE: APIRoute = async ({ params }) => {
    try {
        await connectDB()

        const { id, recipeId } = params

        // Find the user by ID
        const user = await User.findById(id)

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
        }

        // Remove the recipe from the user's favorites
        user.favoriteRecipes = user.favoriteRecipes.filter((fav: any) => fav.toString() !== recipeId)
        await user.save()

        return new Response(JSON.stringify({ message: 'Recipe removed from favorites' }), { status: 200 })
    } catch (error) {
        console.error('Error removing recipe from favorites:', error)
        return new Response(JSON.stringify({ error: 'Error removing recipe from favorites' }), { status: 500 })
    }
}