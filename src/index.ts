import express from 'express';
import dotenv from 'dotenv'
import {startConnection} from './consumer.js'
dotenv.config();
const app = express();

startConnection();

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on ${process.env.PORT}`)
})