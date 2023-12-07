import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService){}
    
    async findAll() {
        return this.prisma.product.findMany({
            include: {
                colors: true
            }
        })
    }

    async findOne(id: string) {
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
        })

        if (!product) {
            throw new NotFoundException
        }

        return product
    }

    async create(createProductDto: CreateProductDto) {
        try {
            const product = await this.prisma.product.create({
                data: createProductDto
            })

            return product
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    throw new ForbiddenException("Name taken")
                }
            }

            throw error
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.findOne(id)

        if (!product) {
            throw new NotFoundException
        }
      
        const updatedProduct = await this.prisma.product.update({
            where: {
                id
            },
            data: updateProductDto
        })

        return updatedProduct;
    }

    async uploadImage(id: string, imageUrl: string) {
        const product = await this.findOne(id)

        if (!product) {
            throw new NotFoundException
        }
      
        const updatedProduct = await this.prisma.product.update({
            where: {
                id
            },
            data: {
                imageUrl: imageUrl
            }
        })

        return updatedProduct;
    }

    async delete(id: string) {
        const product = await this.findOne(id)

        if (!product) {
            throw new NotFoundException
        }

        return await this.prisma.product.delete({
            where: {
                id
            }
        })
    }
}
