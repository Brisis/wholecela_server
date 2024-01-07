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
exports.OrderItemService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrderItemService = class OrderItemService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
        });
    }
    async findOne(id) {
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
        });
        if (!orderItem) {
            throw new common_1.NotFoundException;
        }
        return orderItem;
    }
    async create(createOrderItemDto) {
        try {
            const orderItem = await this.prisma.orderItem.create({
                data: createOrderItemDto
            });
            const order = await this.prisma.order.findUnique({
                where: {
                    id: orderItem.orderId
                }
            });
            const product = await this.prisma.product.findUnique({
                where: {
                    id: orderItem.productId
                }
            });
            if (!order) {
                throw new common_1.NotFoundException;
            }
            if (!product) {
                throw new common_1.NotFoundException;
            }
            await this.prisma.order.update({
                where: {
                    id: orderItem.orderId
                },
                data: {
                    status: client_1.Status.PENDING,
                    totalPrice: order.totalPrice + (product.price * orderItem.quantity)
                }
            });
            return await this.findOne(orderItem.id);
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new common_1.ForbiddenException("Name taken");
                }
            }
            throw error;
        }
    }
    async update(id, updateOrderItemDto) {
        const orderItem = await this.findOne(id);
        if (!orderItem) {
            throw new common_1.NotFoundException;
        }
        const updatedOrderItem = await this.prisma.orderItem.update({
            where: {
                id
            },
            data: updateOrderItemDto
        });
        return await this.findOne(updatedOrderItem.id);
    }
    async delete(id) {
        const orderItem = await this.findOne(id);
        if (!orderItem) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.orderItem.delete({
            where: {
                id
            }
        });
    }
};
exports.OrderItemService = OrderItemService;
exports.OrderItemService = OrderItemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderItemService);
//# sourceMappingURL=order-item.service.js.map