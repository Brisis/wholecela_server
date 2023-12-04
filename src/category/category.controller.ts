import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.categoryService.findOne(id)
    }

    @Post()
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.update(id, updateCategoryDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.categoryService.delete(id)
    }
}
