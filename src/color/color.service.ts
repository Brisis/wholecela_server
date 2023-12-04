import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.color.findMany({
            select: {
                id: true,
                name: true,
                hexCode: true
            }
        })
    }

    async findOne(id: string) {
        const color = await this.prisma.color.findUnique({
            where: {
                id
            }
        })

        if (!color) {
            throw new NotFoundException
        }

        return color
    }

    async create(createColorDto: CreateColorDto) {
        try {
            const color = await this.prisma.color.create({
                data: createColorDto
            })

            return color
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateColorDto: UpdateColorDto) {
        const color = await this.findOne(id)

        if (!color) {
            throw new NotFoundException
        }
      
        const updatedColor = await this.prisma.color.update({
            where: {
                id
            },
            data: updateColorDto
        })

        return updatedColor;
    }

    async delete(id: string) {
        const color = await this.findOne(id)

        if (!color) {
            throw new NotFoundException
        }

        return await this.prisma.color.delete({
            where: {
                id
            }
        })
    }
}