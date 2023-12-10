import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Controller('cart-items')
export class CartItemController {
    constructor(private cartItemService: CartItemService) {}

    @Get()
    findAll() {
        return this.cartItemService.findAll()
    }

    @Get("cart/:id")
    findAllCartItems(@Param("id") id: string) {
        return this.cartItemService.findAllCartItems(id)
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.cartItemService.findOne(id)
    }

    @Post()
    create(@Body() createCartItemDto: CreateCartItemDto) {
        return this.cartItemService.create(createCartItemDto)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateCartItemDto: UpdateCartItemDto) {
        return this.cartItemService.update(id, updateCartItemDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.cartItemService.delete(id)
    }
}
