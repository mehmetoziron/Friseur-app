import { Response, Request, NextFunction } from "express";

export function errorHandler(err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status =    err.status ||err.response?.status || 500;
    const message = 
     err.response?.data?.message ||err.message || "Internal Server Error";

    console.log(err.message);
    

    res.status(status).json({
        data: null,
        errors: [message],
    });
}