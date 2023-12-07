import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { multerOptions } from './validators/multer-options';
import * as sharp from 'sharp';
import { join } from "path"

@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    findAll() {
        return this.productService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.productService.findOne(id)
    }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productService.create(createProductDto)
    }

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

        return this.productService.uploadImage(id, filename);   
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productService.update(id, updateProductDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.productService.delete(id)
    }

    
}
