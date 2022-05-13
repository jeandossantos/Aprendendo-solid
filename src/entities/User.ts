import { v4 as uuid } from 'uuid';

export class User {
    readonly id: string;
    name: string;
    email: string;
    password: string;

    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props);

        if (!this.id) {
            this.id = uuid();
        }
    }
}