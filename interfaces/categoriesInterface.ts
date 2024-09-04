import { Document } from "mongoose";

export interface CategoriesInterface extends Document {
  name: string;
  image: string;
}