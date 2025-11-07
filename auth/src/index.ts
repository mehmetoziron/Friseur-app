import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import authRoutes from './routes/auth';
import mongoose from 'mongoose';

const app = express();
dotenv.config({ path: './.env' });
app.use(express.json());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//app.use(express.urlencoded({extended:true}));
app.use("/auth", authRoutes);

mongoose
   .connect(process.env.MONGO_URI!)
   .then(() => {
      console.log("connected to MongoDB");
      app.listen(process.env.PORT||3001, () => {
         console.log("server is running on port " + process.env.PORT?.toString())
      });
   }).catch(err => {
      console.error("failed to connect to MongoDB", err)
   });
/* 
 app.get('/',(req,res)=>{
    res.send("Hello from the Auth Services"); 
 });
 app.listen(process.env.PORT || 3001,()=>{
    console.log("auth service is running port 3001")
 }); */