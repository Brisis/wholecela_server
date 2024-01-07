import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Status } from '@prisma/client';

@Injectable()
export class OrderItemService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.orderItem.findMany({
            select: {
                id: true,
                createdAt: true,
                quantity: true,
                order: {
                    select: {
                        id: true,
                        totalPrice: true,
                        createdAt: true
                    }
                },
                product: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                    }
                },
            },
        })
    }

    async findOne(id: string) {
        const orderItem = await this.prisma.orderItem.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                createdAt: true,
                quantity: true,
                order: {
                    select: {
                        id: true,
                        totalPrice: true,
                        createdAt: true
                    }
                },
                product: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                    }
                },
            },
        })

        if (!orderItem) {
            throw new NotFoundException
        }

        return orderItem
    }

    async create(createOrderItemDto: CreateOrderItemDto) {
        try {
            const orderItem = await this.prisma.orderItem.create({
                data: createOrderItemDto
            })

            const order = await this.prisma.order.findUnique({
                where: {
                    id: orderItem.orderId
                }
            })

            const product = await this.prisma.product.findUnique({
                where: {
                    id: orderItem.productId
                }
            })

            if (!order) {
                throw new NotFoundException
            }

            if (!product) {
                throw new NotFoundException
            }

            await this.prisma.order.update({
                where: {
                    id: orderItem.orderId
                }, 
                data: {
                    status: Status.PENDING,
                    totalPrice: order.totalPrice + (product.price * orderItem.quantity)
                }
            })

            return await this.findOne(orderItem.id)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
        const orderItem = await this.findOne(id)

        if (!orderItem) {
            throw new NotFoundException
        }
      
        const updatedOrderItem = await this.prisma.orderItem.update({
            where: {
                id
            },
            data: updateOrderItemDto
        })

        return await this.findOne(updatedOrderItem.id);
    }

    async delete(id: string) {
        const orderItem = await this.findOne(id)

        if (!orderItem) {
            throw new NotFoundException
        }

        return await this.prisma.orderItem.delete({
            where: {
                id
            }
        })
    }
}
