import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
export declare class CartItemController {
    private cartItemService;
    constructor(cartItemService: CartItemService);
    findAll(): Promise<{
        product: {
            id: string;
            imageUrl: string;
            title: string;
            price: number;
        };
        id: string;
        quantity: number;
        cartId: string;
    }[]>;
    findAllCartItems(id: string): Promise<{
        product: {
            id: string;
            imageUrl: string;
            title: string;
            price: number;
        };
        id: string;
        quantity: number;
        cartId: string;
    }[]>;
    findOne(id: string): Promise<{
        product: {
            id: string;
            imageUrl: string;
            title: string;
            price: number;
        };
        id: string;
        quantity: number;
        cartId: string;
    }>;
    create(createCartItemDto: CreateCartItemDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        cartId: string;
        productId: string;
    }>;
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
