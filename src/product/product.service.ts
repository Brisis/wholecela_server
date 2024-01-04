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

        return await this.findOne(updatedProduct.id);
    }

    async updateColors(id: string, colors: string[]) {
        const product = await this.findOne(id)

        if (!product) {
            throw new NotFoundException
        }

        let productColors = []
        for (let index = 0; index < colors.length; index++) {
            const color = await this.prisma.color.findUnique({
                where: {
                    id: colors[index]
                }
            })

            if (!color) {
                throw new NotFoundException
            }
           
            productColors.push(color)
        }

        let sortedProductColors = []
        for (let index = 0; index < productColors.length; index++) {
            const element = productColors[index];
            const newEl = {
                id: element.id,
                name: element.name,
                hexCode: element.hexCode,
            }
            sortedProductColors.push(newEl)
        }

        let oldProductColors = []
        for (let index = 0; index < product.colors.length; index++) {
            const element = product.colors[index];
            const newEl = {
                id: element.id,
                name: element.name,
                hexCode: element.hexCode,
            }
            oldProductColors.push(newEl)
        } 

        const diff = oldProductColors.filter((el) => !sortedProductColors.some((e) => e.id == el.id))        
 
        const updatedProduct = await this.prisma.product.update({
            where: {
                id: id
            },
            data: {
                colors: {
                    connect: productColors,
                    disconnect: diff
                }
            }
        })

        return await this.findOne(updatedProduct.id);
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

        return await this.findOne(updatedProduct.id);
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
