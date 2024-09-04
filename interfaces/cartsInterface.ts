import { Document } from "mongoose";
import { UsersInterface } from "./usersInterface";
import { ProductsInterface } from "./productsInterface";

export interface CartsInterface extends Document {
  cartItems: CartProducts[];
  totalPrice: number;
  totalPriceAfterDiscount: number | undefined;
  user: UsersInterface;
}

export interface CartProducts extends Document {
  product: ProductsInterface;
  quantity: number;
  price: number;
}