import type { APIRoute } from "astro";
import { connectDB } from "@/lib/db";
import { Recipe } from "@/models/Recipe";

export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const recipe = await Recipe.findById(params.id);
    if (!recipe) {
      return new Response(JSON.stringify({ error: "Recipe not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify(recipe), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch recipe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    await connectDB();

    const body = await request.json();

    const recipe = await Recipe.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    if (!recipe) {
      return new Response(
        JSON.stringify({
          error: "Recipe not found",
        }),
        { status: 404 },
      );
    }

    return new Response(JSON.stringify(recipe), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to update recipe",
      }),
      { status: 500 },
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    await connectDB();
    const deletedRecipe = await Recipe.findByIdAndDelete(params.id);
    if (!deletedRecipe) {
      return new Response(JSON.stringify({ error: "Recipe not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ message: "Recipe deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return new Response(JSON.stringify({ error: "Failed to delete recipe" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
