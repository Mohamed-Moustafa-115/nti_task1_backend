import { Document } from "mongoose";
import { ProductsInterface } from "./productsInterface";
type Role = 'manager' | 'admin' | 'user'
export interface UsersInterface extends Document {
  email: string;
  password: string;
  name: string;
  image: string;
  role: Role;
  active: boolean;
  wishlist:ProductsInterface[];
  passwordChangedAt: Date | number;
  resetCode: string | undefined;
  resetCodeExpireTime: Date | number | undefined;
  resetCodeVerify: boolean | undefined;
}