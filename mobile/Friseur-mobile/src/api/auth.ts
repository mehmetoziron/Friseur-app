import API from './client'
import { Register } from '../models/Register';

export interface LoginResponse {
    token: string;
    refreshToken: string;
}

export interface LogoutResponse {
    message: string;
}

export interface RegisterResponse {
    message: string;
    verificationCode: string;
}

export interface VerifiyResponse {
    token: string;
    refreshToken: string;
}

export const login = (email: string, password: string): Promise<LoginResponse> =>
    API.post('/auth/login', { email, password })

export const logout = (refreshToken: string): Promise<LogoutResponse> =>
    API.post('/auth/logout', { refreshToken })

export const register = (data: Register): Promise<RegisterResponse> =>
    API.post('/auth/register', data);

export const verify = (email: string, code: string): Promise<VerifiyResponse> =>
    API.post('/auth/verify', {email,code});