import mongoose, { Schema, type Document } from 'mongoose'

interface Iingredient {
    name: string
    quantity: string
    unit: string
}

export interface IRecipe extends Document {
    authorId: string
    averageRating: number
    title: string
    categories: string[]
    difficulty: 'easy' | 'medium' | 'hard'
    description: string
    ingredients: Iingredient[]
    isCommunityRecipe: boolean
    preparationTime: number
    instructions: string[]
    totalRating: number
    ratingsCount: number
    imagesUrl: string[]
    createdAt: Date
    updatedAt: Date
}

const IngredientSchema = new Schema<Iingredient>({
    name: { type: String, required: true },
    quantity: { type: String, required: true },
    unit: { type: String, required: true }
}, { _id: false }) // no necesita su propo id

const RecipeSchema = new Schema<IRecipe>({
    authorId:           { type: String, required: true },
    averageRating:      { type: Number, default: 0 },
    title:              { type: String, required: true },    
    categories:         { type: [String], required: true },
    difficulty:         { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    description:        { type: String, required: true },
    ingredients:        { type: [IngredientSchema], required: true },
    isCommunityRecipe:  { type: Boolean, default: false },
    preparationTime:    { type: Number, required: true },
    instructions:       { type: [String], required: true },
    totalRating:        { type: Number, default: 0 },
    ratingsCount:       { type: Number, default: 0 },
    imagesUrl:          { type: [String], default: [] }
}, { timestamps: true })

export const Recipe = mongoose.models.Recipe || mongoose.model<IRecipe>('Recipe', RecipeSchema)