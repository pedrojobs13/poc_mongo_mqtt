// src/app.ts

import express from 'express';
import routes from './routes'; // Importa as rotas

const app = express();
app.use(express.json()); // Middleware para lidar com JSON

// Usar as rotas
app.use(routes);

export default app; // Exporta a instância do app