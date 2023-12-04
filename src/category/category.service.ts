import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService){}

    async findAll() {
        return this.prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        })
    }

    async findOne(id: string) {
        const category = await this.prisma.category.findUnique({
            where: {
                id
            }
        })

        if (!category) {
            throw new NotFoundException
        }

        return category
    }

    async create(createCategoryDto: CreateCategoryDto) {
        try {
            const category = await this.prisma.category.create({
                data: createCategoryDto
            })

            return category
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const category = await this.findOne(id)

        if (!category) {
            throw new NotFoundException
        }
      
        const updatedCategory = await this.prisma.category.update({
            where: {
                id
            },
            data: updateCategoryDto
        })

        return updatedCategory;
    }

    async delete(id: string) {
        const category = await this.findOne(id)

        if (!category) {
            throw new NotFoundException
        }

        return await this.prisma.category.delete({
            where: {
                id
            }
        })
    }
}
