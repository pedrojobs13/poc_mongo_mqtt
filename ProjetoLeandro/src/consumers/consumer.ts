import { connectRabbitMQ, getChannel } from '../config/rabbitConnect';

const QUEUE_NAME = 'shrimp'; 

const consumeMessages = async () => {
    try {
        const channel = await connectRabbitMQ(); // Estabelece a conexão e obtém o canal

        await channel.assertQueue(QUEUE_NAME, {
            durable: true // A fila sobrevive à reinicialização
        });

        console.log(`Aguardando mensagens na fila "${QUEUE_NAME}"`);

        channel.consume(QUEUE_NAME, (msg) => {
            if (msg) {
                const messageContent = msg.content.toString();
                console.log(`Recebido: ${messageContent}`);

                // Aqui você pode processar a mensagem, como salvar no MongoDB

                // Confirma que a mensagem foi processada
                channel.ack(msg);
            }
        });

    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
};

// Executa a função para iniciar o consumo de mensagens
consumeMessages();