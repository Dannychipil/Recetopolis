import type {APIRoute} from 'astro'
import { connectDB } from '../../../lib/db'
import { Review } from '../../../models/Review'

export const GET: APIRoute = async ({ params }) => {
    try {
        await connectDB()

        const { recipeId } = params

        // Obtener todas las reseñas para la receta
        const reviews = await Review.find({ recipeId })

        return new Response(JSON.stringify(reviews), { status: 200 })
    }   catch (error) {
        console.error('Error al obtener reseñas:', error)
        return new Response(JSON.stringify({ error: 'Error al obtener reseñas' }), { status: 500 })
    }
}