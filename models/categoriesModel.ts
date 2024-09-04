import { Schema, model } from "mongoose";
import { CategoriesInterface } from "../interfaces/categoriesInterface";

const categoriesSchema: Schema = new Schema<CategoriesInterface>({
  name: { type: String, required: true, trim: true, unique: true },
  image: String,
}, { timestamps: true });

export default model<CategoriesInterface>('categories', categoriesSchema)