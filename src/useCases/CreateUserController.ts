import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {

    constructor(private createUserUseCase: CreateUserUseCase) { }

    async handle(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body;

            await this.createUserUseCase.execute({
                email,
                name,
                password
            });

            return res.status(201).send();
        } catch (error) {
            return res.status(400).send(error.message || 'Unexpected error');
        }
    }
}