import { model, Schema } from 'mongoose';
import { UsersInterface } from '../interfaces/usersInterface';
import bcrypt from 'bcryptjs';

const userSchema: Schema = new Schema<UsersInterface>(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 6, maxlength: 20 },
        address: {type:[String],required:true},
        image: String,
        role: { type: String, required: true, enum: ['manager', 'admin', 'user'] },
        active: { type: Boolean, default: true },
        passwordChangedAt: Date,
        resetCode: String,
        resetCodeExpireTime: Date,
        resetCodeVerify: Boolean,
        wishlist: [{ type: Schema.Types.ObjectId, ref: 'products' }],
    },
    { timestamps: true }
);

userSchema.pre<UsersInterface>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

export default model<UsersInterface>('User', userSchema);