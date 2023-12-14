import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
export declare class CartItemService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        product: {
            id: string;
            title: string;
            imageUrl: string;
            price: number;
        };
    }[]>;
    findAllCartItems(cartId: string): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        product: {
            id: string;
            title: string;
            imageUrl: string;
            price: number;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        product: {
            id: string;
            title: string;
            imageUrl: string;
            price: number;
        };
    }>;
    create(createCartItemDto: CreateCartItemDto): Promise<{
        id: string;
        quantity: number;
        cartId: string;
        product: {
            id: string;
            title: string;
            imageUrl: string;
            price: number;
        };
    }[]>;
    update(id: string, updateCartItemDto: UpdateCartItemDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        cartId: string;
        productId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        cartId: string;
        productId: string;
    }>;
}
