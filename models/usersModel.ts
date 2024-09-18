import { Schema, model } from "mongoose";
import { UsersInterface } from "../interfaces/usersInterface";
import bcrypt from 'bcryptjs';
const usersSchema: Schema = new Schema<UsersInterface>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, maxlength: 20 },
  image: String,
  role: { type: String, required: true, enum: ['manager', 'admin', 'user'], default: 'user' },
  active: { type: Boolean, default: true },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'products' }],
  passwordChangedAt: Date,
  resetCode: String,
  resetCodeExpireTime: Date,
  resetCodeVerify: Boolean
}, { timestamps: true });

usersSchema.pre<UsersInterface>('save', async function (next) {
  if (!this.isModified('password')) return next;
  this.password = await bcrypt.hash(this.password, 13)
});

export default model<UsersInterface>('users', usersSchema)