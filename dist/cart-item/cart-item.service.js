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
exports.CartItemService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const prisma_service_1 = require("../prisma/prisma.service");
let CartItemService = class CartItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
        });
    }
    async findAllCartItems(cartId) {
        return this.prisma.cartItem.findMany({
            where: {
                cartId: cartId
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
        });
    }
    async findOne(id) {
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
        });
        if (!cartItem) {
            throw new common_1.NotFoundException;
        }
        return cartItem;
    }
    async create(createCartItemDto) {
        try {
            const existsCart = await this.prisma.cart.findFirst({
                where: {
                    id: createCartItemDto.cartId
                }
            });
            if (!existsCart) {
                throw new common_1.NotFoundException("Cart not found");
            }
            const existsCartItem = await this.prisma.cartItem.findFirst({
                where: {
                    productId: createCartItemDto.productId,
                    cartId: createCartItemDto.cartId
                }
            });
            if (existsCartItem) {
                throw new common_1.ForbiddenException("Cart Item already exists");
            }
            const cartItem = await this.prisma.cartItem.create({
                data: createCartItemDto
            });
            return cartItem;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new common_1.ForbiddenException("Cart Itemo already taken");
                }
            }
            throw error;
        }
    }
    async update(id, updateCartItemDto) {
        const cartItem = await this.findOne(id);
        if (!cartItem) {
            throw new common_1.NotFoundException;
        }
        if (updateCartItemDto.quantity < 1) {
            throw new common_1.ForbiddenException("Quantity cannot be below 0");
        }
        const updatedcartItem = await this.prisma.cartItem.update({
            where: {
                id
            },
            data: updateCartItemDto
        });
        return updatedcartItem;
    }
    async delete(id) {
        const cartItem = await this.findOne(id);
        if (!cartItem) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.cartItem.delete({
            where: {
                id
            }
        });
    }
};
exports.CartItemService = CartItemService;
exports.CartItemService = CartItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartItemService);
//# sourceMappingURL=cart-item.service.js.map