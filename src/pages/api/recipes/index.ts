import type {APIRoute} from 'astro';
import { connectDB } from '@/lib/db';
import { Recipe } from '@/models/Recipe';

export const GET: APIRoute = async ({ url }) => {
  try {
    await connectDB()

    const search     = url.searchParams.get('search')
    const category   = url.searchParams.get('category')
    const difficulty = url.searchParams.get('difficulty')
    const community  = url.searchParams.get('isCommunity')

    const query: Record<string, any> = {}

    // Búsqueda por texto en título o descripción
    if (search) {
      query.$or = [
        { title:       { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ]
    }
    // Filtro por categoría
    if (category) {
      query.categories = { $in: [category] }
    }

    // Filtro por dificultad
    if (difficulty) {
      query.difficulty = difficulty
    }

    // Filtro por recetas de comunidad
    if (community !== null && community !== undefined) {
      query.isCommunityRecipe = community === 'true'
    }

    const recipes = await Recipe.find(query).sort({ createdAt: -1 })

    return new Response(JSON.stringify(recipes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return new Response(JSON.stringify({ error: 'Error fetching recipes' }), { status: 500 })
  }
}  

export const POST: APIRoute = async ({ request }) => {
  try {
    await connectDB();
    const body = await request.json();
    const newRecipe = await Recipe.create(body)
    return new Response(JSON.stringify(newRecipe), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  })
  } catch (error) {
    console.error('Error creating recipe:', error);
    return new Response(JSON.stringify({ error: 'Failed to create recipe' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}