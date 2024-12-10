import express from 'express';
import { Request, Response } from 'express';
import db from './config/mongo'; // Arquivo com a configuração do MongoDB

const app = express();

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () =>{
  console.log("Conexão com o banco feita com sucesso");
});

app.use(express.json()); // Middleware para processar JSON

// Rota simples de teste
app.get('/', (req: Request, res: Response) => {
  res.send('Olá mundo!');
});

// Rota POST para testar o echo
app.post("/echo", (req: Request, res: Response) => {
  res.json({ received: req.body });
});

export default app
