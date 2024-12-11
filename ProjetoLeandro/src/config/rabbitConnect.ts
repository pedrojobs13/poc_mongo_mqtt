import amqp from 'amqplib';

let channel: amqp.Channel;
let connection: amqp.Connection;

const RABBITMQ_URI = 'amqp://localhost:5672';

export const connectRabbitMQ = async () => {
    try {
        connection = await amqp.connect(RABBITMQ_URI);
        channel = await connection.createChannel();
        console.log('Conexão com RabbitMQ estabelecida com sucesso.');

        // Aqui você pode retornar o canal ou a conexão
        return channel;
    } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
        throw error; // Lançar o erro para ser tratado em outro lugar, se necessário
    }
};

export const getChannel = () => {
    if (!channel) {
        throw new Error('Canal RabbitMQ não está disponível. Certifique-se de que a conexão foi estabelecida.');
    }
    return channel;
};

export const closeConnection = async () => {
    if (connection) {
        await connection.close();
        console.log('Conexão com RabbitMQ encerrada.');
    }
};
