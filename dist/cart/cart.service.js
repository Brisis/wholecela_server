"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const prisma_service_1 = require("../prisma/prisma.service");
let CartService = class CartService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
                        productId: true
                    }
                }
            }
        });
        var cartsWithSellers = [];
        for (let i = 0; i < carts.length; i++) {
            const cart = carts[i];
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
                seller
            };
            cartsWithSellers.push(newCart);
        }
        return cartsWithSellers;
    }
    async findOne(id) {
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
        });
        if (!cart) {
            throw new common_1.NotFoundException;
        }
        return cart;
    }
    async create(createCartDto) {
        try {
            const existsCart = await this.prisma.cart.findFirst({
                where: {
                    userId: createCartDto.userId,
                    sellerId: createCartDto.sellerId
                }
            });
            if (existsCart) {
                throw new common_1.ForbiddenException("Cart already exists");
            }
            const cart = await this.prisma.cart.create({
                data: createCartDto
            });
            return cart;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new common_1.ForbiddenException("Cart already exists");
                }
            }
            throw error;
        }
    }
    async delete(id) {
        const cart = await this.findOne(id);
        if (!cart) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.cart.delete({
            where: {
                id
            }
        });
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartService);
//# sourceMappingURL=cart.service.js.map