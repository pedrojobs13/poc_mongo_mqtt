import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const mongoDatabase = process.env.MONGODB_DATABASE;

if (!mongoUri || !mongoDatabase) {
    throw new Error("As variáveis de ambiente MONGODB_URI e MONGODB_DATABASE devem ser definidas.");
}

const stringConnection = `${mongoUri}${mongoDatabase}`;


if(!stringConnection){
    throw new Error("string de conexão não informada")
}

mongoose.connect(stringConnection)
    .then(() => console.log("Conectado ao MongoDB"))
    .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

const db = mongoose.connection;

export default db;
