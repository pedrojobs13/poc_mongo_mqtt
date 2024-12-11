import express from "express";
import db from "./config/dbConnect";
import routes from "./routes/index";


db.on("error", console.log.bind(console, "Erro de conexão"));
db.on("open", () =>{
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

export default app
