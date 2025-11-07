export interface Register  {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    proffession?: string;
    birthDate?: Date;
    gender?: "male" | "female";
    role: "admin" | "customer" | "expert" | "secretary";
}
