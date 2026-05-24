import mongoose from "mongoose"
import {config} from "dotenv"
import { Recipe } from "../src/models/Recipe"
import { Review } from "../src/models/Review"
import { User } from "../src/models/Users"

config() // Carga las variables de entorno

const recipes = [{
    authorId: "admin",
    averageRating: 0,
    title: "Hotcakes esponjosos",
    categories: ["Desayunos"],
    difficulty: "easy",
    description: "Unos deliciosos hotcakes esponjosos perfectos para el desayuno.",
    ingredients: [
        { name: "Harina", quantity: "2", unit: "tazas" },
        { name: "Leche", quantity: "1", unit: "taza" },
        { name: "Huevo", quantity: "2", unit: "piezas" },
        { name: "Polvo para hornear", quantity: "1", unit: "cdita" },
        { name: "Sal", quantity: "1", unit: "pizca" },
        { name: "Mantequilla", quantity: "2", unit: "cdas" },
    ],
    isCommunityRecipe: false,
    preparationTime: 30,
    instructions: [
        "Mezcla los ingredientes secos en un tazón.",
        "Agrega la leche, huevos y mantequilla derretida.",
        "Mezcla hasta integrar, no sobre-mezcles.",
        "Calienta un sartén a fuego medio y engrasa ligeramente.",
        "Vierte 1/4 de taza de mezcla por hotcake.",
        "Cocina hasta que burbujee y voltea. Cocina 1 min más.",
    ],
    totalRating: 0,
    ratingsCount: 0,
    imagesUrl: []
},
{
    authorId: "admin",
    averageRating: 0,
    title: "Flan napolitano",
    categories: ["Postres"],
    difficulty: "medium",
    description: "Flan napolitano cremoso con caramelo, el postre mexicano por excelencia.",
    ingredients: [
        { name: "Leche condensada", quantity: "1", unit: "lata" },
        { name: "Leche evaporada", quantity: "1", unit: "lata" },
        { name: "Huevos", quantity: "3", unit: "piezas" },
        { name: "Queso crema", quantity: "190", unit: "g" },
        { name: "Azúcar", quantity: "1/2", unit: "taza" },
        { name: "Vainilla", quantity: "1", unit: "cdita" },
    ],
    isCommunityRecipe: false,
    preparationTime: 75,
    instructions: [
        "Derrite el azúcar en un molde hasta formar caramelo.",
        "Licúa el resto de ingredientes hasta integrar.",
        "Vierte la mezcla sobre el caramelo en el molde.",
        "Hornea a baño maría a 180°C por 60 minutos.",
        "Deja enfriar y refrigera mínimo 2 horas.",
        "Desmolda y sirve frío.",
    ],
    totalRating: 0,
    ratingsCount: 0,
    imagesUrl: []
}
]

const users = [{
    username: "admin",
    email: "admin@example.com",
    password: "admin123",
    favoriteRecipes: ["6a12697ceed750f5b4223377"]
},
{
    username: "user1",
    email: "user1@example.com",
    password: "user123",
    favoriteRecipes: ["6a12697ceed750f5b4223377", "6a12697ceed750f5b4223378"]
}
]

const review = [{
    recipeId: "6a12697ceed750f5b4223377",
    userId: "user1",
    rating: 5,
    comment: "¡Deliciosos hotcakes! Muy esponjosos y fáciles de hacer.",
}]

async function seed() {
   try {
        await mongoose.connect(process.env.MONGODB_URI || '')
        console.log('MongoDB conectado para seed')

        await Recipe.deleteMany({})
        console.log('Recetas eliminadas')

        await User.deleteMany({})
        console.log('Usuarios eliminados')

        await Review.deleteMany({})
        console.log('Reseñas eliminadas')

        await User.insertMany(users)
        console.log('Usuarios insertados:', users.length)

        await Review.insertMany(review)
        console.log('Reseñas insertadas:', review.length)  
        
        await Recipe.insertMany(recipes)
        console.log('Recetas insertadas:', recipes.length)

        await mongoose.disconnect()
        console.log('MongoDB desconectado después de seed')
        process.exit(0)
   }catch (error) {
        console.error('Error en el seed:', error)
        process.exit(1)
   }
}

seed()
