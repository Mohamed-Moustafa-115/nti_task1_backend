import { Document, Schema } from "mongoose";
import { CategoriesInterface } from "./categoriesInterface";

export interface SubCategoriesInterface extends Document {
  name: string;
  category: CategoriesInterface;
  image: string;
}