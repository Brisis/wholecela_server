import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Controller('colors')
export class ColorController {
    constructor(private colorService: ColorService){}

    @Get()
    findAll() {
        return this.colorService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.colorService.findOne(id)
    }

    @Post()
    create(@Body() createColorDto: CreateColorDto) {
        return this.colorService.create(createColorDto)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateColorDto: UpdateColorDto) {
        return this.colorService.update(id, updateColorDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.colorService.delete(id)
    }
}
