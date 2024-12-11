import mqtt from 'mqtt';
import {config} from 'dotenv';

config();
const BROKER_URL = `mqtt://localhost:1883`
const TOPIC = 'shrimp';


const client = mqtt.connect(BROKER_URL);


export const connectRabbitMQ = async () => {
    try {
        client.on('connect', () => {
            console.log('Conectado ao broker MQTT!');

            const mensagem = {texto: 'Olá, MQTT!', timestamp: new Date()};
            client.publish(TOPIC, JSON.stringify(mensagem), (err) => {
                if (err) {
                    console.error('Erro ao publicar mensagem:', err);
                } else {
                    console.log('Mensagem publicada com sucesso:', mensagem);
                }
            });


            client.subscribe(TOPIC, (err) => {
                if (err) {
                    console.error('Erro ao se inscrever no tópico:', err);
                } else {
                    console.log(`Inscrito no tópico: ${TOPIC}`);
                }
            });
        });
    } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
        throw error; // Lançar o erro para ser tratado em outro lugar, se necessário
    }
};


client.on('message', (topic, message) => {
    console.log(`Mensagem recebida no tópico ${topic}:`, message.toString());

    try {
        const parsedMessage = JSON.parse(message.toString());
        console.log('Mensagem decodificada:', parsedMessage);
    } catch (error) {
        console.error('Erro ao decodificar a mensagem:', error);
    }
});


client.on('error', (err) => {
    console.error('Erro no cliente MQTT:', err);
    client.end();
});