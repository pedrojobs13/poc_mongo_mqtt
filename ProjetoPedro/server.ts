// server.ts
import "dotenv/config";
import app from "./src/app"; // Importa a instância do app

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor funcionando em: http://localhost:${port}`);
});