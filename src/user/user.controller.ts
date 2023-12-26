import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as sharp from 'sharp';
import { join } from "path"
import { multerOptions } from 'src/product/validators/multer-options';

@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    findAll(@Query('role') role?: "customer" | "seller" | "admin") {
        return this.userService.findAll(role);
    }

    @UseGuards(JwtGuard)
    @Get("authenticate")
    getLoggedUser(@GetUser() user: User) {        
        //return this.userService.findOne(user.id);
        return user;
    }

    @Get(':id')
    findOne(@Param("id") id: string, @Query('role') role?: "customer" | "seller" | "admin") {
        return this.userService.findOne(id, role);
    }

    @UseGuards(JwtGuard)
    @Patch(":id/update")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto)
    }

    @UseGuards(JwtGuard)
    @Post(":id/upload-image")
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async uploadImage(@Param("id") id: string, @UploadedFile() file: Express.Multer.File) {

        const filename = file.filename;
        const filePath = join(__dirname, '../../uploads', filename);
        const targetPath = join(__dirname, '../../uploads/thumbnails', filename);
        
        await sharp(filePath.toString())
            .resize(200)
            .webp({ effort: 3 })
            .toFile(targetPath.toString());

        return this.userService.uploadImage(id, filename);   
    }
}
