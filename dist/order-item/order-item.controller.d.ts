import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
export declare class OrderItemController {
    private orderItemService;
    constructor(orderItemService: OrderItemService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        order: {
            id: string;
            createdAt: Date;
            totalPrice: number;
        };
        product: {
            id: string;
            title: string;
            price: number;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        order: {
            id: string;
            createdAt: Date;
            totalPrice: number;
        };
        product: {
            id: string;
            title: string;
            price: number;
        };
    }>;
    create(createOrderItemDto: CreateOrderItemDto): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        order: {
            id: string;
            createdAt: Date;
            totalPrice: number;
        };
        product: {
            id: string;
            title: string;
            price: number;
        };
    }>;
    update(id: string, updateOrderItemDto: UpdateOrderItemDto): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        order: {
            id: string;
            createdAt: Date;
            totalPrice: number;
        };
        product: {
            id: string;
            title: string;
            price: number;
        };
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        quantity: number;
        orderId: string;
        productId: string;
    }>;
}
