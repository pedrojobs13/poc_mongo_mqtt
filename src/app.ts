import {Request, Response, Router} from 'express';
import {initRabbitMq, sendMessage} from './message/rabbimq-setup'

const router = Router();
(async (): Promise<void> => {
    await initRabbitMq();
    router.post('/pedido', (req: Request, res: Response) => {
        sendMessage(req.body)
        res.status(200).json({ok: true, message: req.body});
    });

})();


export default router;