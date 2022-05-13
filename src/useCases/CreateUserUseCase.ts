import { User } from "../entities/User";
import { IMailProvider } from "../providers/IMailProvider";
import { IUserRepository } from "../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private MailProvider: IMailProvider) { }

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);
        console.log(userAlreadyExists)
        if (userAlreadyExists) {
            throw new Error('User already exists.');
        }
        const user = new User(data);

        await this.userRepository.create(user);

        await this.MailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do meu APP',
                email: 'equipe@app.com'
            },
            subject: 'Seja bem-vindo(a) à plataforma',
            body: '<p>Você já pode fazer login na nossa plataforma</p>'
        });
    }
}