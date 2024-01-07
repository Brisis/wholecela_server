import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.order.findMany({
            select: {
                id: true,
                createdAt: true,
                status: true,
                totalPrice: true,
                location: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        phone: true
                    }
                },
                orderItems: {
                    select: {
                        id: true,
                        quantity: true,
                        createdAt: true,
                        product: {
                            select: {
                                id: true,
                                title: true,
                                price: true,
                                imageUrl: true
                            }
                        },
                    }
                },
                
            },
        })
    }

    async findAllUserOrders(userId: string) {
        return this.prisma.order.findMany({
            where: {
                userId: userId
            },
            select: {
                id: true,
                createdAt: true,
                status: true,
                totalPrice: true,
                location: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        phone: true
                    }
                },
                orderItems: {
                    select: {
                        id: true,
                        quantity: true,
                        createdAt: true,
                        product: {
                            select: {
                                id: true,
                                title: true,
                                price: true,
                                imageUrl: true
                            }
                        },
                    }
                },
                
            },
        })
    }

    async findOne(id: string) {
        const order = await this.prisma.order.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                createdAt: true,
                status: true,
                totalPrice: true,
                location: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                },
                user: {
                    select: {
                        name: true,
                        phone: true
                    }
                },
                orderItems: {
                    select: {
                        id: true,
                        quantity: true,
                        createdAt: true,
                        product: {
                            select: {
                                id: true,
                                title: true,
                                price: true,
                                imageUrl: true
                            }
                        },
                    }
                },
                
            },
        })

        if (!order) {
            throw new NotFoundException
        }

        return order
    }

    async create(createOrderDto: CreateOrderDto) {
        try {
            const order = await this.prisma.order.create({
                data: createOrderDto
            })

            return await this.findOne(order.id)
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const order = await this.findOne(id)

        if (!order) {
            throw new NotFoundException
        }
      
        const updatedOrder = await this.prisma.order.update({
            where: {
                id
            },
            data: updateOrderDto
        })

        return await this.findOne(updatedOrder.id);
    }

    async delete(id: string) {
        const order = await this.findOne(id)

        if (!order) {
            throw new NotFoundException
        }

        return await this.prisma.order.delete({
            where: {
                id
            }
        })
    }
}
