import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    favoriteRecipes: string[]; // Array of recipe IDs
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    username:        { type: String, required: true, unique: true },
    email:           { type: String, required: true, unique: true },
    password:        { type: String, required: true },
    favoriteRecipes: { type: [String], default: [] } // Array of recipe IDs
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);