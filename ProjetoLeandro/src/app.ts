import express from "express";
import db from "./config/dbConnect";
import routes from "./routes/index";
import {connectRabbitMQ} from "./config/rabbitMqttConnect"

db.on("error", console.log.bind(console, "Erro de conexão"));
db.on("open", () => {
    console.log("Conexão com o banco feita com sucesso");
});


const initializeRabbitMQ = async () => {
    try {
        await connectRabbitMQ();
    } catch (error) {
        console.error("Erro ao conectar ao RabbitMQ:", error);
        process.exit(1);
    }
};

initializeRabbitMQ();


const app = express();
routes(app);

export default app
