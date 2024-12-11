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
        client.on('connect', () => resolve());
        client.on('error', reject);
    });
};
(async () => {
    try {
        await waitForMqttConnection();
        console.log('Servidor Express iniciado.');

        router.post('/pedido', (req: Request, res: Response) => {
            const message = req.body;


            const promises = [];
            for (let i = 0; i < 2; i++) {
                const messageToSend = { ...message, id: i + 1 };
                promises.push(
                    new Promise<void>((resolve, reject) => {
                        client.publish(TOPIC, JSON.stringify(messageToSend), (err) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                            }
                        });
                    })
                );
            }

            Promise.all(promises)
                .then(() => {
                    console.log('Todas as mensagens foram publicadas.');
                    res.status(200).send('Mensagens publicadas.');
                })
                .catch((error) => {
                    console.error('Erro ao publicar mensagens:', error);
                    res.status(500).send('Erro ao publicar mensagens.');
                });
        });

    } catch (error) {
        console.error('Erro ao conectar ao broker MQTT:', error);
    }
})();

export default router;
