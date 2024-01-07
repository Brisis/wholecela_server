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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
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
        });
    }
    async findAllUserOrders(userId) {
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
        });
    }
    async findOne(id) {
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
        });
        if (!order) {
            throw new common_1.NotFoundException;
        }
        return order;
    }
    async create(createOrderDto) {
        try {
            const order = await this.prisma.order.create({
                data: createOrderDto
            });
            return await this.findOne(order.id);
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
    async update(id, updateOrderDto) {
        const order = await this.findOne(id);
        if (!order) {
            throw new common_1.NotFoundException;
        }
        const updatedOrder = await this.prisma.order.update({
            where: {
                id
            },
            data: updateOrderDto
        });
        return await this.findOne(updatedOrder.id);
    }
    async delete(id) {
        const order = await this.findOne(id);
        if (!order) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.order.delete({
            where: {
                id
            }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map