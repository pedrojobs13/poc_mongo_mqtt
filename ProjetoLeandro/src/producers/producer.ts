import amqp from 'amqplib';

const QUEUE_NAME = 'shrimp'; // O nome da fila

export const sendMessage = async (message: string) => {
    try {
        const connection = await amqp.connect('amqp://localhost:5672'); // URL do RabbitMQ
        const channel = await connection.createChannel();

        await channel.assertQueue(QUEUE_NAME, {
            durable: true // A fila sobrevive à reinicialização
        });

        channel.sendToQueue(QUEUE_NAME, Buffer.from(message));
        console.log(`Mensagem enviada: ${message}`);

        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};