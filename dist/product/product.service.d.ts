import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        colors: {
            id: string;
            name: string;
            hexCode: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string;
        description: string;
        quantity: number;
        price: number;
        authenticity: boolean;
        returnPolicy: boolean;
        warranty: boolean;
        ownerId: string;
        categoryId: string;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        imageUrl: string;
        title: string;
        description: string;
        quantity: number;
        price: number;
        authenticity: boolean;
        returnPolicy: boolean;
        warranty: boolean;
        categoryId: string;
        colors: {
            id: string;
            name: string;
            hexCode: string;
        }[];
    }>;
    create(createProductDto: CreateProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string;
        description: string;
        quantity: number;
        price: number;
        authenticity: boolean;
        returnPolicy: boolean;
        warranty: boolean;
        ownerId: string;
        categoryId: string;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string;
        description: string;
        quantity: number;
        price: number;
        authenticity: boolean;
        returnPolicy: boolean;
        warranty: boolean;
        ownerId: string;
        categoryId: string;
    }>;
    uploadImage(id: string, imageUrl: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string;
        description: string;
        quantity: number;
        price: number;
        authenticity: boolean;
        returnPolicy: boolean;
        warranty: boolean;
        ownerId: string;
        categoryId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        imageUrl: string;
        description: string;
        quantity: number;
        price: number;
        authenticity: boolean;
        returnPolicy: boolean;
        warranty: boolean;
        ownerId: string;
        categoryId: string;
    }>;
}
