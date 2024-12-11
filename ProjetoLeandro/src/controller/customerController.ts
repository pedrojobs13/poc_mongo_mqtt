import { Request, Response } from "express";
import customer from "../entity/customer";

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
        try{
            await customer.create(req.body);
            res.status(201).json({message: "Customer created with sucess!"});
        } catch(e){
            if (e instanceof Error) {
                res.status(500).json(`Internal server Error! ${e.message}`);
            } else {
                res.status(500).json('Internal server Error!');
            }
        }
    }


}

export default CustomerController;
