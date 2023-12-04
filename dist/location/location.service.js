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
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
let LocationService = class LocationService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.location.findMany({
            select: {
                id: true,
                name: true,
                city: true
            }
        });
    }
    async findOne(id) {
        const location = await this.prisma.location.findUnique({
            where: {
                id
            }
        });
        if (!location) {
            throw new common_1.NotFoundException;
        }
        return location;
    }
    async create(createLocationDto) {
        try {
            const location = await this.prisma.location.create({
                data: createLocationDto
            });
            return location;
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
    async update(id, updateLocationDto) {
        const location = await this.findOne(id);
        if (!location) {
            throw new common_1.NotFoundException;
        }
        const updatedLocation = await this.prisma.location.update({
            where: {
                id
            },
            data: updateLocationDto
        });
        return updatedLocation;
    }
    async delete(id) {
        const location = await this.findOne(id);
        if (!location) {
            throw new common_1.NotFoundException;
        }
        return await this.prisma.location.delete({
            where: {
                id
            }
        });
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LocationService);
//# sourceMappingURL=location.service.js.map