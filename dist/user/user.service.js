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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(role) {
        if (role) {
            var rolesArray = [];
            if (role == 'seller') {
                rolesArray = await this.prisma.user.findMany({
                    where: {
                        role
                    },
                    include: {
                        products: {
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
                        }
                    },
                });
                if (rolesArray.length === 0) {
                    throw new common_1.NotFoundException("Sellers not found");
                }
                const sortedData = rolesArray.sort(function (a, b) {
                    return a.products.length - b.products.length;
                });
                return sortedData.reverse().filter((item) => delete item.hashedPassword && delete item.createdAt && delete item.updatedAt);
            }
            else if (role == 'admin') {
                rolesArray = await this.prisma.user.findMany({
                    where: {
                        role
                    },
                });
                if (rolesArray.length === 0) {
                    throw new common_1.NotFoundException("Administrators not found");
                }
                return rolesArray.filter((item) => delete item.hashedPassword);
            }
            else {
                rolesArray = await this.prisma.user.findMany({
                    where: {
                        role: 'customer'
                    },
                });
                if (rolesArray.length === 0) {
                    throw new common_1.NotFoundException("Users not found");
                }
                return rolesArray.filter((item) => delete item.hashedPassword);
            }
        }
        return (await this.prisma.user.findMany({})).filter((item) => delete item.hashedPassword);
    }
    async findOne(id, role) {
        if (role) {
            if (role == 'seller') {
                const seller = await this.prisma.user.findUnique({
                    where: {
                        id
                    },
                    include: {
                        products: {
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
                        }
                    }
                });
                if (!seller) {
                    throw new common_1.NotFoundException("Seller not found");
                }
                delete seller.hashedPassword;
                delete seller.createdAt;
                delete seller.updatedAt;
                return seller;
            }
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
        });
        if (!user) {
            throw new common_1.NotFoundException;
        }
        delete user.hashedPassword;
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        if (updateUserDto.locationId) {
            const locationId = updateUserDto.locationId;
            const location = await this.prisma.location.findUnique({
                where: {
                    id: locationId
                }
            });
            if (!location) {
                throw new common_1.NotFoundException("Location not found");
            }
        }
        const updatedUser = await this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto
        });
        return updatedUser;
    }
    async uploadImage(id, imageUrl) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException;
        }
        const updatedUser = await this.prisma.user.update({
            where: {
                id
            },
            data: {
                imageUrl: imageUrl
            }
        });
        return updatedUser;
    }
    async delete(id) {
        const user = await this.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.user.delete({
            where: {
                id
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map