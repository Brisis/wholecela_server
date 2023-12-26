import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService){}

    async findAll() {

        const carts = await this.prisma.cart.findMany({ 
            select: {
                id: true,
                userId: true,
                sellerId: true,
                cartItems: {
                    select: {
                        id: true,
                        quantity: true,
                        cartId: true,
                        productId: true,
                        product: {
                            select: {
                                price: true
                            }
                        }
                    }
                }
            }
        });

        var cartsWithSellers = []

        var total = 0;
        for (let i = 0; i < carts.length; i++) {
            
            const cart = carts[i];
            total = cart.cartItems.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.quantity * currentValue.product.price)
            }, 0)            

            const seller = await this.prisma.user.findUnique({
                where: {
                    id: cart.sellerId
                },
                select: {
                    name: true,
                    imageUrl: true
                }
            });

            const newCart = {
                ...cart,
                total,
                seller
            }

            newCart.cartItems.filter((item) => delete item.product)

            cartsWithSellers.push(newCart);
        }

        return cartsWithSellers
    }

    async findAllUserCarts(userId: string) {

        const carts = await this.prisma.cart.findMany({ 
            where: {
                userId: userId
            },
            select: {
                id: true,
                userId: true,
                sellerId: true,
                cartItems: {
                    select: {
                        id: true,
                        quantity: true,
                        cartId: true,
                        productId: true,
                        product: {
                            select: {
                                price: true
                            }
                        }
                    }
                }
            }
        });

        var cartsWithSellers = []

        var total = 0;
        for (let i = 0; i < carts.length; i++) {
            const cart = carts[i];

            total = cart.cartItems.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.quantity * currentValue.product.price)
            }, 0)   

            const seller = await this.prisma.user.findUnique({
                where: {
                    id: cart.sellerId
                },
                select: {
                    name: true,
                    imageUrl: true
                }
            });

            const newCart = {
                ...cart,
                total,
                seller
            }

            newCart.cartItems.filter((item) => delete item.product)

            cartsWithSellers.push(newCart);
        }


        return cartsWithSellers
    }

    async findUserCartBySeller(userId: string, sellerId: string) {

        const existsCart =  await this.prisma.cart.findFirst({ 
            where: {
                userId: userId,
                sellerId: sellerId
            },
        })

        if (existsCart) {
            const cart = await this.prisma.cart.findUnique({ 
                where: {
                    id: existsCart.id,
                },
                select: {
                    id: true,
                    userId: true,
                    sellerId: true,
                    cartItems: {
                        select: {
                            id: true,
                            quantity: true,
                            cartId: true,
                            productId: true,
                            product: {
                                select: {
                                    price: true
                                }
                            }
                        }
                    }
                }
            });

            var total = cart.cartItems.reduce((accumulator, currentValue) => {
                return accumulator + (currentValue.quantity * currentValue.product.price)
            }, 0)   

            const seller = await this.prisma.user.findUnique({
                where: {
                    id: sellerId
                },
                select: {
                    name: true,
                    imageUrl: true
                }
            });

            const newCart =  {
                ...cart,
                total,
                seller
            }

            newCart.cartItems.filter((item) => delete item.product)
    
            return newCart
        }
        
        throw new NotFoundException("Cart not registered")
    }

    async findOne(id: string) {
        const cart = await this.prisma.cart.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                userId: true,
                sellerId: true,
                cartItems: {
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
                }
            }
        })

        if (!cart) {
            throw new NotFoundException
        }

        var total = cart.cartItems.reduce((accumulator, currentValue) => {
            return accumulator + (currentValue.quantity * currentValue.product.price)
        }, 0)  

        const newCart =  {
            ...cart,
            total
        }

        newCart.cartItems.filter((item) => delete item.product)

        return cart
    }

    async create(createCartDto: CreateCartDto) {

        try {

            const existsCart = await this.prisma.cart.findFirst({
                where: {
                    userId: createCartDto.userId,
                    sellerId: createCartDto.sellerId
                }
            })

            if (existsCart) {
                throw new ForbiddenException("Cart already exists")
            }

            const cart = await this.prisma.cart.create({
                data: createCartDto
            })
    
            return cart
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Cart already exists")
                }
            }

            throw error
        }
       
    }

    async delete(id: string) {
        const cart = await this.findOne(id)
        const userId = cart.userId

        if (!cart) {
            throw new NotFoundException
        }

        const deletedCart = await this.prisma.cart.delete({
            where: {
                id
            }
        })

        return await this.findAllUserCarts(userId)
    }
}
