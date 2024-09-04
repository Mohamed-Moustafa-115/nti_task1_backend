import { Document } from "mongoose";

export interface CouponsInterface extends Document {
  name: string;
  expireTime: Date;
  discount: number;
};