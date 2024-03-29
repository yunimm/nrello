import { Schema, model, Document } from 'mongoose';
import { generateHash } from '../utils/hash';
import bcrypt from 'bcryptjs';

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    stripeCustomerId: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        stripeCustomerId: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);
/* 在save保存之前，先加密密碼 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await generateHash(this.password);
});

userSchema.methods.comparePassword = async function (passwords: string) {
    return await bcrypt.compare(passwords, this.password);
};

export const User = model<UserDocument>('User', userSchema);
