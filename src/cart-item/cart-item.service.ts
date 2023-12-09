import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartItemService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.cartItem.findMany({
            select: {
                id: true,
                quantity: true,
                cartId: true,
                product: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                        imageUrl: true,
                    }
                }
            }
        })
    }

    async findOne(id: string) {
        const cartItem = await this.prisma.cartItem.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                quantity: true,
                cartId: true,
                product: {
                    select: {
                        id: true,
                        title: true,
                        price: true,
                        imageUrl: true,
                    }
                }
            }
        })

        if (!cartItem) {
            throw new NotFoundException
        }

        return cartItem
    }

    async create(createCartItemDto: CreateCartItemDto) {
        try {

            const existsCart = await this.prisma.cart.findFirst({
                where: {
                    id: createCartItemDto.cartId
                }
            })

            if (!existsCart) {
                throw new NotFoundException("Cart not found")
            }

            const existsCartItem = await this.prisma.cartItem.findFirst({
                where: {
                    productId: createCartItemDto.productId,
                    cartId: createCartItemDto.cartId
                }
            })

            if (existsCartItem) {
                throw new ForbiddenException("Cart Item already exists")
            }

            const cartItem = await this.prisma.cartItem.create({
                data: createCartItemDto
            })
    
            return cartItem
           
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Cart Itemo already taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateCartItemDto: UpdateCartItemDto) {
        const cartItem = await this.findOne(id)

        if (!cartItem) {
            throw new NotFoundException
        }

        if (updateCartItemDto.quantity < 1) {
            throw new ForbiddenException("Quantity cannot be below 0")
        }
      
        const updatedcartItem = await this.prisma.cartItem.update({
            where: {
                id
            },
            data: updateCartItemDto
        })

        return updatedcartItem;
    }

    async delete(id: string) {
        const cartItem = await this.findOne(id)

        if (!cartItem) {
            throw new NotFoundException
        }

        return await this.prisma.cartItem.delete({
            where: {
                id
            }
        })
    }
}
