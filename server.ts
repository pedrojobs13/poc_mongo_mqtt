import express from 'express';
import dotenv from 'dotenv';
import router from './src/app'

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/api', router);
app.listen(port, () => {
    console.log(`Servidor funcionando em: http://localhost:${port}`);
});

export default app;