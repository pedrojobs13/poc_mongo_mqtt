import {Request, Response} from "express";

export async function fetch(req: Request, res: Response): Promise<void> {
    try {
        res.status(200).json("customersCollection");
    } catch (e) {
        if (e instanceof Error) {
            res.status(500).json(`Internal server Error! ${e.message}`);
        } else {
            res.status(500).json('Internal server Error!');
        }
    }
}
