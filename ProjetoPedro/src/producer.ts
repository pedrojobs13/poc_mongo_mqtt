// src/producer.ts

import amqp from 'amqplib';

const RABBITMQ_URI = 'amqp://localhost:5672';
const QUEUE_NAME = 'shrimp'; 

export const sendMessage = async (message: string) => {
    try {
        const connection = await amqp.connect(RABBITMQ_URI);
        const channel = await connection.createChannel();


        await channel.assertQueue(QUEUE_NAME, {
            durable: true 
        });


        channel.sendToQueue(QUEUE_NAME, Buffer.from(message), { persistent: true });
        console.log(`Mensagem enviada: ${message}`);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};