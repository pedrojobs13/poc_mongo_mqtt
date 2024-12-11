import { Request, Response, Router } from 'express';
import mqtt from 'mqtt';
import { config } from 'dotenv';

config();

const BROKER_URL = `mqtt://${process.env.RABBITMQ_HOST || 'localhost'}`;
const TOPIC = 'shrimp';

const client = mqtt.connect(BROKER_URL);

client.on('connect', () => {
    console.log('Conectado ao broker MQTT!');
});

client.on('error', (err) => {
    console.error('Erro ao conectar com o broker MQTT:', err);
});

const router = Router();

const waitForMqttConnection = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        client.on('connect', resolve); // Resolve quando conectado
        client.on('error', reject); // Rejeita em caso de erro
    });
};

(async () => {
    try {

        await waitForMqttConnection();
        console.log('Servidor Express iniciado.');

        router.post('/pedido', (req: Request, res: Response) => {
            const message = req.body;

            console.log('Publicando mensagem...', message);

            client.publish(TOPIC, JSON.stringify(message), (err) => {
                if (err) {
                    console.error('Erro ao publicar mensagem:', err);
                    return res.status(500).json({ ok: false, message: 'Erro ao publicar mensagem' });
                } else {
                    console.log('Mensagem publicada com sucesso:', message);
                    return res.status(200).json({ ok: true, message });
                }
            });
        });

    } catch (error) {
        console.error('Erro ao conectar ao broker MQTT:', error);
    }
})();

export default router;
