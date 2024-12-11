import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const stringConection = process.env.MONGODB_URI

if(!stringConection){
    throw new Error("string de conexão não informada")
}

mongoose.connect(stringConection);

const db = mongoose.connection;

export default db;