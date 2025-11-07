import jwt from 'jsonwebtoken';

export function generateAccessToken (payload: object):string{
    return jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn:"1h"})
}

export function generateRefreshToken (payload: object):string{
    return jwt.sign(payload,process.env.JWT_REFRESH_SECRET!,{expiresIn:"7d"})
}