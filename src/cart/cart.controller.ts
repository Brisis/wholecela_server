import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartController {
    constructor(private cartSevice: CartService) {}

    @Get()
    findAll() {
        return this.cartSevice.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.cartSevice.findOne(id)
    }

    @Post()
    create(@Body() createCartDto: CreateCartDto) {
        return this.cartSevice.create(createCartDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.cartSevice.delete(id)
    }
}
