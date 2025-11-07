import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import authRoutes from './routes/auth';
import { errorHandler } from './middlewares/errorHandler';
import { responseWrapper } from './middlewares/responseWrapper';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// rate limiting                            istek siniri verme
// caching middleware                       
// data sanitization  middleware            /\{} gibi yazilardan koruma
// gol yailabilir
// authentication middleware
// login middleware                         sifre karakter icermesi & email vs vs 

app.use(responseWrapper);

app.use("/auth",authRoutes);


app.use(errorHandler);

app.listen(process.env.PORT,()=>{
    console.log(`gateway id running on port${process.env.PORT}`);
});