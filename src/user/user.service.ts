import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}
    
    async findAll(role?: "customer" | "seller" | "admin") {
        if (role) {
            var rolesArray = []

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
                })
    
                if (rolesArray.length === 0) {
                    throw new NotFoundException("Sellers not found")
                }

                const sortedData = rolesArray.sort(function(a,b) {
                    return a.products.length - b.products.length;
                })
    
                return sortedData.reverse().filter((item) => delete item.hashedPassword && delete item.createdAt && delete item.updatedAt);
            }
            else if (role == 'admin') {
                rolesArray = await this.prisma.user.findMany({
                    where: {
                        role
                    }, 
                })
    
                if (rolesArray.length === 0) {
                    throw new NotFoundException("Administrators not found")
                }
    
                return rolesArray.filter((item) => delete item.hashedPassword);
            }

            else {
                rolesArray = await this.prisma.user.findMany({
                    where: {
                        role: 'customer'
                    }, 
                })

                if (rolesArray.length === 0) {
                    throw new NotFoundException("Users not found")
                }

                return rolesArray.filter((item) => delete item.hashedPassword);
            }
        }

        return (await this.prisma.user.findMany({})).filter((item) => delete item.hashedPassword)
    }

    async findOne(id: string, role?: "customer" | "seller" | "admin") {

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
                })

                if (!seller) {
                    throw new NotFoundException("Seller not found")
                }

                delete seller.hashedPassword
                delete seller.createdAt
                delete seller.updatedAt

                return seller
            }
        }

        const user = await this.prisma.user.findUnique({
            where: {
                id
            },
        })

        if (!user) {
            throw new NotFoundException
        }

        delete user.hashedPassword
        // delete user.createdAt
        // delete user.updatedAt

        return user
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        if (updateUserDto.locationId) {
            const locationId = updateUserDto.locationId

            const location = await this.prisma.location.findUnique({
                where: {
                    id: locationId
                }
            })

            if (!location) {
                throw new NotFoundException("Location not found") 
            }
        }
      
        const updatedUser = await this.prisma.user.update({
            where: {
                id
            },
            data: updateUserDto
        })

        return updatedUser;
    }

    async delete(id: string) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException
        }

        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }
}
