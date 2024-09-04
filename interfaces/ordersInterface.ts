import { Document } from "mongoose";
import { CartProducts } from "./cartsInterface";
import { UsersInterface } from "./usersInterface";

export interface OrdersInterface extends Document {
  cartItems: CartProducts;
  totalPrice: number;
  paymentMethod: Payment;
  deliveredAt: Date | number;
  isDelivered: boolean;
  paidAt: Date | number;
  isPaid: boolean;
  taxPrice: number;
  address: string;
  user: UsersInterface;
}

type Payment = 'cash' | 'card'