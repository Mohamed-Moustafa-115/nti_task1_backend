import { Schema, model } from "mongoose";
import { CartsInterface } from "../interfaces/cartsInterface";

const cartsSchema: Schema = new Schema<CartsInterface>({
  cartItems: [{
    product: { type: Schema.Types.ObjectId, ref: 'products' },
    quantity: { type: Number, default: 1 },
    price: Number
  }],
  totalPrice: Number,
  totalPriceAfterDiscount: Number,
  user: { type: Schema.Types.ObjectId, ref: 'users' }
}, { timestamps: true });

cartsSchema.pre<CartsInterface>(/^find/, function (next) {
  this.populate({ path: 'cartItems.product', select: 'name cover' })
  next()
})

export default model<CartsInterface>('carts', cartsSchema)