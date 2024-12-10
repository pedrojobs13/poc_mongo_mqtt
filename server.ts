import "dotenv/config";
import app from "./src/index";


const port = 3000;


app.listen(port, () =>{
  console.log('Servidor funcionado')})

