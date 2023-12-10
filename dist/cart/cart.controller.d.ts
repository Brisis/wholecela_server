import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartController {
    private cartSevice;
    constructor(cartSevice: CartService);
    findAll(): Promise<any[]>;
    findAllUserCarts(id: string): Promise<any[]>;
    findUserCartBySeller(id: string, sellerId: string): Promise<{
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
