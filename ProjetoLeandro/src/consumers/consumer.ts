import mqtt from 'mqtt';

const BROKER_URL = 'mqtt://localhost:1883'; // Porta MQTT padrão para RabbitMQ
const TOPIC = 'shrimp';

const client = mqtt.connect(BROKER_URL, {
    clientId: 'unique-client-id',
    clean: false
});

client.on('connect', () => {
    console.log('Conectado ao broker MQTT!');
    client.subscribe(TOPIC, { qos: 1 }, (err) => {
        if (err) {
            console.error('Erro ao se inscrever:', err);
        } else {
            console.log(`Inscrito no tópico: ${TOPIC}`);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Recebido no tópico ${topic}: ${message.toString()}`);
});
