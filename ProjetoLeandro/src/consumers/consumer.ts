// src/mqttConsumer.ts

import { connectRabbitMQ } from '../config/rabbitConnect';

const QUEUE_NAME = 'shrimp'; // O nome da fila onde você deseja ouvir mensagens

const consumeMessages = async () => {
    try {
        const channel = await connectRabbitMQ(); // Estabelece a conexão e obtém o canal

        // Certifique-se de que a fila existe e é durável
        await channel.assertQueue(QUEUE_NAME, {
            durable: true // A fila sobrevive à reinicialização
        });

        console.log(`Aguardando mensagens na fila "${QUEUE_NAME}"`);

        channel.consume(QUEUE_NAME, (msg) => {
            if (msg) {
                const messageContent = msg.content.toString();
                console.log(`Recebido: ${messageContent}`);

                // Processar a mensagem aqui (ex: salvar no banco de dados)

                // Confirma que a mensagem foi processada
                channel.ack(msg); // Confirma a entrega da mensagem
            }
        });
    } catch (error) {
        console.error('Erro ao consumir mensagens:', error);
    }
};

// Executa a função para iniciar o consumo de mensagens
consumeMessages();