import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { match } from 'node:assert/strict';


const users = [
    { id: "user-1", name: "John Doe" },
    { id: "user-2", name: "Jane Dobby" },
    { id: "user-3", name: "Demetreius" }
];

@Controller('user')
export class UserController {

    // GET "/user"
    @Get()
    getUser(@Query("name") name: string) {



        if (name) {
            const filtered = users.filter((user) => user.name.toLowerCase().includes(name.toLowerCase()))
            return filtered;
        }

        return users;
    }


    @Get(':id')
    getUserByid(@Param("id") id: string) {
        if(id?.trim()){
            const user = users.find((user) => user.id === id)
            return user
        }
        throw new NotFoundException()
    }


    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        const { name } = createUserDto;
        if(name.trim()){
            const newUser = {
                id: `user-${users.length + 1}`,
                name
            }
            users.push(newUser);

            return {
                message: "user sucessfully created",
                newUser
            }
        }
        throw new BadRequestException();
    }


    @Put(":id")
    updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        
        const matchingUserIdx = users.findIndex(user => user.id === id);

        if(matchingUserIdx === -1) {
            throw new NotFoundException();
        }
        
        users[matchingUserIdx] = {
            ...users[matchingUserIdx],
            ...updateUserDto,
            id,
        }
        return {
            message: "User successfuly updated",
            user: users[matchingUserIdx]
        }
        
    }
}
