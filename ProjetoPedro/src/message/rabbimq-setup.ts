import client, { Channel, Connection, ConsumeMessage } from 'amqplib';
import dotenv from "dotenv";

dotenv.config();
const QUEUE = 'pedidos';
let connection: Connection;
let channel: Channel;

export async function initRabbitMq(): Promise<void> {
    await getConnection();
    await createChannel();
    await channel.assertQueue(QUEUE);
}

export function sendMessage(payload: any): void {
    const message = JSON.stringify(payload);
    channel.sendToQueue(QUEUE, Buffer.from(message));
}

export async function consumeMessages(onMessage: (message: any) => void): Promise<void> {
    if (!channel) {
        throw new Error("Channel is not initialized. Call initRabbitMq first.");
    }

    await channel.consume(QUEUE, (msg: ConsumeMessage | null) => {
        if (msg) {
            const messageContent = msg.content.toString();
            try {
                const parsedMessage = JSON.parse(messageContent);
                onMessage(parsedMessage);
                channel.ack(msg); // Acknowledge the message after successful processing
            } catch (error) {
                console.error("Failed to process message:", error);
                channel.nack(msg, false, false); // Reject the message and do not requeue
            }
        }
    });
}

async function getConnection() {
    connection = await client.connect(
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
}

async function createChannel() {
    channel = await connection.createChannel();
}