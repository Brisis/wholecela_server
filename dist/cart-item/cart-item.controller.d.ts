import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartItemController {
    private cartItemService;
    constructor(cartItemService: CartItemService);
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
    findAllCartItems(id: string): Promise<{
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
