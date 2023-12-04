import { Body, Controller, Get, Param, Patch, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    findAll(@Query('role') role?: "customer" | "seller" | "admin") {
        return this.userService.findAll(role);
    }

    @Get(':id')
    findOne(@Param("id") id: string, @Query('role') role?: "customer" | "seller" | "admin") {
        return this.userService.findOne(id, role);
    }
    
    @UseGuards(JwtGuard)
    @Get("authenticate")
    getLoggedUser(@GetUser() user: User) {        
        //return this.userService.findOne(user.id);
        return user;
    }

    @UseGuards(JwtGuard)
    @Patch(":id/update")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }
}
