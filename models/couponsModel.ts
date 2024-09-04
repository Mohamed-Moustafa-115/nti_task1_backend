import { Schema, model } from "mongoose";
import { CouponsInterface } from "../interfaces/couponsInterface";

const couponsSchema: Schema = new Schema<CouponsInterface>({
  name: { type: String, required: true, trim: true, unique: true },
  expireTime: { type: Date, required: true },
  discount: { type: Number, required: true, min: 1, max: 100 },
}, { timestamps: true });

export default model<CouponsInterface>('coupons', couponsSchema)