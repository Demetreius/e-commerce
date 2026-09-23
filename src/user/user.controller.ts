import { Body, Controller, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    // GET "/user"
    @Get()
    getUsers(@Query("name") name: string): unknown {
        return this.userService.findAllUsers(name ?? "");
    }


    @Get(':id')
    getUserByid(@Param("id") id: string): unknown {
        const user = this.userService.getOne(id)
        
        if(!user) {
            throw new NotFoundException("User not found");
        }
        
        return user;
    }


    @Post()
    createUser(@Body() createUserDto: CreateUserDto): unknown {
        return this.userService.createUser(createUserDto)
    }


    @Put(":id")
    updateUser(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto): unknown {
        return this.userService.updateUser(id, updateUserDto)
    }
}
