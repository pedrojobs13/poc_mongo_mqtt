// server.ts

import "dotenv/config"; // Carrega as variáveis de ambiente
import app from "./src/app"; // Importa a instância da aplicação


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor funcionando em: http://localhost:${port}`);
});