import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class PostgresUserRepository implements IUserRepository {
    private users: User[] = [];

    async create(data: User): Promise<void> {
        this.users.push(data);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(u => u.email === email);
        return user;
    }
}