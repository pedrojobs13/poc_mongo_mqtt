import express, { Application } from "express";
import customer from "./customerRoutes"
import { Request, Response } from "express";

const routes = (app:Application) =>{
    app.use(express.json());

    app.route("/").get((req:Request, res:Response) => res.status(200).send("Geral route"));

    app.use(customer);
}

export default routes;
