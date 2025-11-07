import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    email: string;
    passwordHash: string;
    passwordSalt: string;
    fullName: string;
    phone?: string;
    proffession?: string;
    birthDate?: Date;
    gender?: "male" | "female";
    role: "admin" | "customer" | "expert" | "secretary"
    photoUrl?: string;
    isVerified?: boolean;
    verificationCode?: string;
    verificationCodeExpires?: Date;
    createdAt?: Date;
    refreshToken?: string;
    forgotPasswordCode?: string;
    forgotPasswordCodeExpires?: Date;
    branchId?: string;
    serviceIds?: string[];
    isDeleted?: boolean;
}


const userSchema = new mongoose.Schema<IUser>({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    passwordSalt: { type: String },
    fullName: { type: String, required: true },
    phone: { type: String },
    proffession: { type: String },
    birthDate: { type: Date },
    gender: { type: String, enum: ["male", "female"] },
    role: { type: String, enum: ["admin", "customer", "expert", "secretary"], default: "customer" },
    photoUrl: { type: String },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationCodeExpires: { type: Date },
    createdAt: { type: Date, default: Date.now },
    refreshToken: { type: String },
    forgotPasswordCode: { type: String },
    forgotPasswordCodeExpires: { type: Date },
    branchId: { type: String },
    serviceIds: [{ type: String }],
    isDeleted: { type: Boolean, default: false }
})

export const User = mongoose.model<IUser>("User",userSchema);
 
