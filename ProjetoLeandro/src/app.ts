// src/app.ts

import express from 'express';
import routes from './routes'; 
import db from './config/dbConnect'; 
import { connectRabbitMQ } from './config/rabbitConnect'; 

const app = express();
app.use(express.json());

db.on("error", console.log.bind(console, "Erro de conexão"));
db.on("open", () => {
    console.log("Conexão com o banco feita com sucesso");
});

const initializeRabbitMQ = async () => {
    try {
        const channel = await connectRabbitMQ();
        console.log('Conexão com RabbitMQ estabelecida com sucesso.');

        const QUEUE_NAME = 'shrimp'; 
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log(`Aguardando mensagens na fila "${QUEUE_NAME}"`);
        
        channel.consume(QUEUE_NAME, (msg) => {
            if (msg) {
                const messageContent = msg.content.toString();
                console.log(`Recebido: ${messageContent}`);

                channel.ack(msg); 
            }
        });
    } catch (error) {
        console.error('Erro ao conectar ou consumir mensagens:', error);
        process.exit(1); 
    }
};

initializeRabbitMQ();

app.use('/api', routes); 

export default app;
