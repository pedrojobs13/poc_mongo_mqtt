import express from "express";
import CustomerController from "../controller/customerController";

const routes = express.Router();

routes.get("/customers", CustomerController.fetch);
routes.post("/customers", CustomerController.create);

export default routes;
