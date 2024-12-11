import client, {Channel, Connection} from 'amqplib';
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

async function getConnection() {
    connection = await client.connect(
        `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
}

async function createChannel() {
    channel = await connection.createChannel();
}
