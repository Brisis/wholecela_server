import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
export declare class CartController {
    private cartSevice;
    constructor(cartSevice: CartService);
    findAll(): Promise<any[]>;
    findAllUserCarts(id: string): Promise<any[]>;
    findUserCartBySeller(id: string, sellerId: string): Promise<{
        total: number;
        seller: {
            name: string;
            imageUrl: string;
        };
        id: string;
        cartItems: {
            product: {
                price: number;
            };
            id: string;
            quantity: number;
            cartId: string;
            productId: string;
        }[];
        userId: string;
        sellerId: string;
    }>;
    findOne(id: string): Promise<{
        id: string;
        cartItems: {
            product: {
                id: string;
                imageUrl: string;
                title: string;
                price: number;
            };
            id: string;
            quantity: number;
            cartId: string;
        }[];
        userId: string;
        sellerId: string;
    }>;
    create(createCartDto: CreateCartDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        sellerId: string;
    }>;
    delete(id: string): Promise<any[]>;
}
