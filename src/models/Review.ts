import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
    recipeId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>({
    recipeId:   { type: String, required: true },
    userId:     { type: String, required: true },
    rating:     { type: Number, required: true, min: 1, max: 5 },
    comment:    { type: String, required: true }
}, { timestamps: true });

export const Review = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);