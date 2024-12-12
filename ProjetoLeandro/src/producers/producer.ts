import mqtt from 'mqtt';

const MQTT_BROKER_URL = 'mqtt://localhost:1883'; // URL do broker
const TOPIC_NAME = 'shrimp'; // O nome do tópico que você deseja publicar mensagens

const client = mqtt.connect(MQTT_BROKER_URL, {
    username: 'user', // Nome de usuário (caso tenha configurado)
    password: 'password' // Senha (caso tenha configurado)
});

export const sendMessage = (message: string) => {
    client.on('connect', () => {
        console.log('Conectado ao Broker MQTT');
        
        // Publica a mensagem com QoS 1 para garantir entrega
        client.publish(TOPIC_NAME, message, { qos: 1 }, (err) => {
            if (err) {
                console.error('Erro ao enviar mensagem:', err);
            } else {
                console.log(`Mensagem enviada: ${message}`);
            }

            client.end(); // Fecha a conexão após enviar a mensagem
        });
    });

    client.on('error', (err) => {
        console.error('Erro ao conectar-se ao Broker MQTT:', err);
    });
};