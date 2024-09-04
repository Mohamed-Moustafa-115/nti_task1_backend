import { Document } from "mongoose";
import { UsersInterface } from "./usersInterface";
import { ProductsInterface } from "./productsInterface";

export interface ReviewsInterface extends Document {
  comment: string;
  rating: number;
  user: UsersInterface;
  product: ProductsInterface;
};