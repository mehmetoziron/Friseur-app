import  jwt  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
    user?:any
}

export function authMiddleware(req: AuthRequest,res: Response, next: NextFunction){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return next({status:401,message:"unauthorized."});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        return next({status:401,message:"unauthorized.."});
    }
    try{
        const payload=jwt.verify(token, process.env.JWT_SECRET!);
        req.user = payload;
        next();
    }catch(error){
        next({status:401,message:"unnauthorized..."})
    }
}