import express from "express";
import routes from "./routes";
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ACCESS?.split(' ')
}))

app.use(routes)

app.listen(3333, () => console.log('HTTP Server Running!'))