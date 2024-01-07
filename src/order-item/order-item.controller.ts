import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';

@Controller('order-items')
export class OrderItemController {
    constructor(private orderItemService: OrderItemService){}

    @Get()
    findAll() {
        return this.orderItemService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.orderItemService.findOne(id)
    }

    @Post()
    create(@Body() createOrderItemDto: CreateOrderItemDto) {
        return this.orderItemService.create(createOrderItemDto)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
        return this.orderItemService.update(id, updateOrderItemDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.orderItemService.delete(id)
    }
}
