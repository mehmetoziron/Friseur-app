import AsyncStorage from "@react-native-async-storage/async-storage";
import { Register } from "../models/Register";
import { User } from "../models/User";
import { create } from "zustand";
import * as AuthAPI from '../api/auth';

interface TokenPayload {
    exp: string;
    iat: string;
    role: string;
    id: string;
}
export interface AuthState {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (data: Register) => Promise<void>;
    refreshToken: () => Promise<void>;
    setUser: (user: User | null) => void;
    registerVerified: (email: string, code: string) => Promise<void>;
}

const saveUserToStorege = async (user: User | null) => {
    if (user) {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } else {
        await AsyncStorage.removeItem('user');
    }
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    loading: false,

    login: async (email, password) => {
        set({ loading: true });
        try {
            const response = await AuthAPI.login(email, password);

            const { token, refreshToken } = response;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`).join(''));
            const payload = JSON.parse(jsonPayload) as TokenPayload;

            const user: User = {
                _id: payload.id,
                email,
                fullName: "",
                role: payload.role as "admin" | "customer" | "expert" | "secretary",
                token,
                refreshToken,
                isVerified: true,
            }

            set({ user, loading: true });
            // api call to get user details
            // const userDetails = await AuthAPI.getUserDetails();

            await saveUserToStorege(user);
            set({ user, loading: false });
        }
        catch (error) {
            set({ loading: false });
            throw error;
        }
    },
    register: async (data) => {
        set({ loading: true });
        try {
            const response = await AuthAPI.register(data);
            const { message, verificationCode } = response;
            console.log(message, verificationCode);
            set({ loading: false });
        }
        catch (error) {
            set({ loading: false });
            console.error("Register error:", error);
        }
    },
    logout: async () => {
        set({ loading: true })
        try {
            const { user } = get();
            if (user?.refreshToken) {
                await AuthAPI.logout(user.refreshToken);
                await saveUserToStorege(null);
                set({ user: null, loading: false });
            }
            else
                set({ loading: false })
        } catch (error) {
            console.error("Logout error:", error);
            set({ loading: false });
        }
    },
    refreshToken: async () => { },
    setUser: async (user) => {
        set({ user });
        saveUserToStorege(user);
    },
    registerVerified: async (email, code) => { 
        set({ loading: true });
        try {
            const response = await AuthAPI.verify(email, code);
            const { token, refreshToken } = response;
            console.log("token:", token);
            await AuthAPI.logout(refreshToken);
            set({ loading: false });
        }
        catch (error) {
            console.error("Register error:", error);
            set({ loading: false }); 
        }
    },
}));