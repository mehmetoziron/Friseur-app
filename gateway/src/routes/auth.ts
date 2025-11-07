import express from 'express';
import dotenv from 'dotenv'
import axios from 'axios';
import { authMiddleware } from '../middlewares/authMiddleware';

dotenv.config();
const router = express.Router();



/* 
register
verify
refresh-token
logout
forgot-password
verify-forgot-password
reset-password
user/:id
users
user/:id            put
user/:id/delete     put
 */

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

router.post("/register",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/register`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
    
})

router.post("/verify",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/verify`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
    
})

router.post("/forgot-password",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/forgot-password`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
    
})

router.post("/verify-forgot-password",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/verify-forgot-password`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
    
})

router.post("/login",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/login`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }

})

router.post("/logout",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/logout`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
})

router.use(authMiddleware); // giris yapilmamissa asagidakiler yapilamaz



router.post("/refresh-token",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/refresh-token`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
    
})



router.post("/reset-password",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/reset-password`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
    
})

router.get("/user/:id",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/user/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
    
})

router.get("/users",async (req,res,next)=>{
    try {
        const response= await axios.get(`${AUTH_SERVICE_URL}/auth/users`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
})

router.put("/user/:id",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/user/${req.params.id}`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }

})

router.put("/user/:id/delete",async(req,res,next)=>{
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/auth/user/${req.params.id}/delete`,req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }

})

export default router;