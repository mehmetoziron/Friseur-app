export interface User {
    _id?: string;
    email: string;
    fullName: string;
    phone?: string;
    proffession?: string;
    birthDate?: Date;
    gender?: "male" | "female";
    role: "admin" | "customer" | "expert" | "secretary"
    photoUrl?: string;
    isVerified?: boolean;
    token?: string;
    refreshToken?: string;
    branchId?: string;
    serviceIds?: string[];
    isDeleted?: boolean;
}