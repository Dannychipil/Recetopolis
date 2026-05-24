import type {APIRoute} from 'astro';
import { connectDB } from '../../../lib/db';
import { Recipe } from '../../../models/Recipe';

export const GET: APIRoute = async () => {
  try {
    await connectDB();
    const recipes = await Recipe.find({});
    return new Response(JSON.stringify(recipes), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch recipes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
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