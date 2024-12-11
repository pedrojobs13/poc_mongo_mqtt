import mqtt from 'mqtt';

const BROKER_URL = `mqtt://localhost:5672`;
const TOPIC = 'shrimp';

const client = mqtt.connect(BROKER_URL);

client.on('connect', () => {
    console.log(`Inscrito no tópico ${TOPIC}`);
    client.subscribe(TOPIC);
});

client.on('message', (topic, message) => {
    console.log(`Recebido: ${message.toString()}`);
});
