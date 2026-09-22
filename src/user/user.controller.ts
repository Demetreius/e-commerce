import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';


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
    createUser(@Body() body: { name: string }) {
        const { name } = body;
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
}
