import { Request, Response } from "express";
import customer from "../entity/customer";
import {sendMessage } from '../producers/producer'

class CustomerController{

    static async fetch(req:Request, res:Response) {
        try{
            const customersCollection = await customer.find({});
            res.status(200).json(customersCollection);
        } catch(e){
            if (e instanceof Error) {
                res.status(500).json(`Internal server Error! ${e.message}`);
            } else {
                res.status(500).json('Internal server Error!');
            }
        }
    }

    static async create(req:Request, res:Response) {
        const { name, documentNumber, address } = req.body;

        try {
            // Criação do novo cliente
            const newCustomer = new customer({ name, documentNumber, address });
            await newCustomer.save();
    
            // Enviar mensagem para RabbitMQ após criar o cliente
            await sendMessage(JSON.stringify(newCustomer)); // Envia o cliente criado como mensagem
    
            res.status(201).json({
                success: true,
                message: 'Cliente criado com sucesso!',
                customer: newCustomer
            });
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            res.status(500).json({
                success: false,
                error: 'Erro ao criar cliente.'
            });
        }
    }


}

export default CustomerController;
