import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<any[]>;
    findAllUserCarts(userId: string): Promise<any[]>;
    findUserCartBySeller(userId: string, sellerId: string): Promise<{
        seller: {
            name: string;
            imageUrl: string;
        };
        id: string;
        userId: string;
        sellerId: string;
        cartItems: {
            id: string;
            quantity: number;
            cartId: string;
            productId: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        sellerId: string;
        cartItems: {
            id: string;
            quantity: number;
            cartId: string;
            product: {
                id: string;
                imageUrl: string;
                title: string;
                price: number;
            };
        }[];
    }>;
    create(createCartDto: CreateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sellerId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sellerId: string;
    }>;
}
