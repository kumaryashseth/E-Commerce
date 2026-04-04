import express from "express";
import mongoose from 'mongoose'
import dotenv from "dotenv";




dotenv.config()
const app=express()







const PORT=8000 || process.env.PORT
app.listen(PORT,(req,res)=>{
    console.log(`Server started at ${PORT}`);
    
})