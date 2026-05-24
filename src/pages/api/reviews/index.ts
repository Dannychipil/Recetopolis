import type {APIRoute} from 'astro'
import { connectDB } from '../../../lib/db'
import { Recipe } from '../../../models/Recipe'
import { Review } from '../../../models/Review'

export const POST: APIRoute = async ({ request }) => {
    try {
        await connectDB()

        const { recipeId, userId, rating, comment } = await request.json()

        // Verificar que la receta existe
        const recipe = await Recipe.findById(recipeId)
        if (!recipe) {
            return new Response(JSON.stringify({ error: 'Receta no encontrada' }), { status: 404 })
        }

        // Crear la reseña
        const review = new Review({
            recipeId,
            userId,
            rating,
            comment
        })
        
        await review.save()

       // Recalcula averageRating en la receta
        const reviews = await Review.find({ recipeId })
        const average = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        await Recipe.findByIdAndUpdate(recipeId, {
            averageRating: average,
            ratingsCount: reviews.length
        })

        

        return new Response(JSON.stringify({ message: 'Reseña creada exitosamente', review }), { status: 201 })
    } catch (error) {
        console.error('Error al crear reseña:', error)
        return new Response(JSON.stringify({ error: 'Error al crear reseña' }), { status: 500 })
    }
} 