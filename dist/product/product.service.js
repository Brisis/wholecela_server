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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let ProductService = class ProductService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.product.findMany({
            include: {
                colors: true
            }
        });
    }
    async findOne(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                imageUrl: true,
                description: true,
                quantity: true,
                price: true,
                authenticity: true,
                returnPolicy: true,
                warranty: true,
                categoryId: true,
                colors: {
                    select: {
                        id: true,
                        name: true,
                        hexCode: true,
                    }
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException;
        }
        return product;
    }
    async create(createProductDto) {
        try {
            const product = await this.prisma.product.create({
                data: createProductDto
            });
            return product;
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
    async update(id, updateProductDto) {
        const product = await this.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException;
        }
        const updatedProduct = await this.prisma.product.update({
            where: {
                id
            },
            data: updateProductDto
        });
        return updatedProduct;
    }
    async uploadImage(id, imageUrl) {
        const product = await this.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException;
        }
        const updatedProduct = await this.prisma.product.update({
            where: {
                id
            },
            data: {
                imageUrl: imageUrl
            }
        });
        return updatedProduct;
    }
    async delete(id) {
        const product = await this.findOne(id);
        if (!product) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.product.delete({
            where: {
                id
            }
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map