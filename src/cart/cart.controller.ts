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

    @Get("user/:id")
    findAllUserCarts(@Param("id") id: string) {
        return this.cartSevice.findAllUserCarts(id)
    }

    @Get("user/:id/seller/:sellerId")
    findUserCartBySeller(@Param("id") id: string, @Param("sellerId") sellerId: string) {
        return this.cartSevice.findUserCartBySeller(id, sellerId)
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
