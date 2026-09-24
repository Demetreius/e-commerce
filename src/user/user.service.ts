import { Injectable } from '@nestjs/common';
import { LoggerService } from './user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';


interface User {
    id: string,
    name: string,
    email: string
}


@Injectable()
export class UserService {

    constructor(private readonly logger: LoggerService) { }

    private users: User[] = [
        { id: "user-1", name: "Fombeng Arthur", email: "doe@gmail.com" },
        { id: "user-2", name: "Jane Dobby", email: "Tchana@univdschang.gov" },
        { id: "user-3", name: "Boucheke Demetreius", email: "demetreius@server.cm" }
    ];


    findAllUsers(name: string) {

        this.logger.log("finding all the users...")
        return this.users.filter((user) =>
            user?.name.trim().toLowerCase().includes(name?.trim().toLowerCase()))
    }

    getOne(id: string) {
        this.logger.log("finding one user...")
        return this.users.find((user) => user.id === id) ?? null
    }

    createUser(payload: CreateUserDto) {

        this.logger.log("Creating a user...")
        const newUser: User = {
            id: `user-${this.users.length + 1}`,
            ...payload
        }
        this.users.push(newUser);

        return newUser;
    }

    updateUser(id: string, payload: UpdateUserDto) {

        this.logger.log("Updating a user...")

        const matchingUserIdx = this.users.findIndex(user => user.id === id);

        if (matchingUserIdx === -1) {
            return null;
        }

        this.users[matchingUserIdx] = {
            ...this.users[matchingUserIdx],
            ...payload,
            id,
        }

        return this.users[matchingUserIdx]
    }

    deleteUser(id: string) {
        this.logger.log(`Deleting the user ${id}...`);

        const index = this.users.findIndex((user) => user.id === id);
        if(index === -1) return null;

        const [deleted] = this.users.splice(index, 1);

        return deleted;
    }
}
