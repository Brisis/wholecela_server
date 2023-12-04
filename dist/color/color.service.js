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
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const prisma_service_1 = require("../prisma/prisma.service");
let ColorService = class ColorService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.color.findMany({
            select: {
                id: true,
                name: true,
                hexCode: true
            }
        });
    }
    async findOne(id) {
        const color = await this.prisma.color.findUnique({
            where: {
                id
            }
        });
        if (!color) {
            throw new common_1.NotFoundException;
        }
        return color;
    }
    async create(createColorDto) {
        try {
            const color = await this.prisma.color.create({
                data: createColorDto
            });
            return color;
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
    async update(id, updateColorDto) {
        const color = await this.findOne(id);
        if (!color) {
            throw new common_1.NotFoundException;
        }
        const updatedColor = await this.prisma.color.update({
            where: {
                id
            },
            data: updateColorDto
        });
        return updatedColor;
    }
    async delete(id) {
        const color = await this.findOne(id);
        if (!color) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.color.delete({
            where: {
                id
            }
        });
    }
};
exports.ColorService = ColorService;
exports.ColorService = ColorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ColorService);
//# sourceMappingURL=color.service.js.map