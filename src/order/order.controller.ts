import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService){}

    @Get()
    findAll() {
        return this.orderService.findAll()
    }

    @Get("/user/:userId")
    findAllUserOrders(@Param("userId") userId: string) {
        return this.orderService.findAllUserOrders(userId)
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.orderService.findOne(id)
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.orderService.create(createOrderDto)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.orderService.update(id, updateOrderDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.orderService.delete(id)
    }
}
