// src/routes/index.ts

import { Router, Request, Response } from 'express';
import { sendMessage } from '../producer'; // Importa a função do producer

const router = Router();

// Endpoint para enviar mensagens ao RabbitMQ
router.post('/send-message', async (req: Request, res: Response) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'A mensagem é obrigatória.' });
    }

    try {
        await sendMessage(message); // Envia a mensagem para RabbitMQ
        res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
        res.status(500).json({ error: 'Erro ao enviar a mensagem.' });
    }
});

export default router;