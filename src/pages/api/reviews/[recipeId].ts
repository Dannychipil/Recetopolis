import type { APIRoute } from "astro";
import { connectDB } from "@/lib/db";
import { Review } from "@/models/Review";
import { User } from "@/models/Users";

export const GET: APIRoute = async ({ params }) => {
  try {
    await connectDB();

    const { recipeId } = params;

    const reviews = await Review.find({ recipeId }).lean();

    const reviewsWithUser = await Promise.all(
      reviews.map(async (review) => {
        const user = await User.findById(review.userId);

        return {
          ...review,
          userName: user?.username || "Usuario Anónimo",
        };
      }),
    );

    return new Response(JSON.stringify(reviewsWithUser), { status: 200 });
  } catch (error) {
    console.error("Error al obtener reseñas:", error);

    return new Response(JSON.stringify({ error: "Error al obtener reseñas" }), {
      status: 500,
    });
  }
};
