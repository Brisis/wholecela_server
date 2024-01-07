import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.Status;
        totalPrice: number;
        orderItems: {
            id: string;
            createdAt: Date;
            quantity: number;
            product: {
                id: string;
                imageUrl: string;
                title: string;
                price: number;
            };
        }[];
        user: {
            name: string;
            phone: string;
        };
        location: {
            id: string;
            name: string;
            city: string;
        };
    }[]>;
    findAllUserOrders(userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.Status;
        totalPrice: number;
        orderItems: {
            id: string;
            createdAt: Date;
            quantity: number;
            product: {
                id: string;
                imageUrl: string;
                title: string;
                price: number;
            };
        }[];
        user: {
            name: string;
            phone: string;
        };
        location: {
            id: string;
            name: string;
            city: string;
        };
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.Status;
        totalPrice: number;
        orderItems: {
            id: string;
            createdAt: Date;
            quantity: number;
            product: {
                id: string;
                imageUrl: string;
                title: string;
                price: number;
            };
        }[];
        user: {
            name: string;
            phone: string;
        };
        location: {
            id: string;
            name: string;
            city: string;
        };
    }>;
    create(createOrderDto: CreateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.Status;
        totalPrice: number;
        orderItems: {
            id: string;
            createdAt: Date;
            quantity: number;
            product: {
                id: string;
                imageUrl: string;
                title: string;
                price: number;
            };
        }[];
        user: {
            name: string;
            phone: string;
        };
        location: {
            id: string;
            name: string;
            city: string;
        };
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.Status;
        totalPrice: number;
        orderItems: {
            id: string;
            createdAt: Date;
            quantity: number;
            product: {
                id: string;
                imageUrl: string;
                title: string;
                price: number;
            };
        }[];
        user: {
            name: string;
            phone: string;
        };
        location: {
            id: string;
            name: string;
            city: string;
        };
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.Status;
        totalPrice: number;
        userId: string;
        locationId: string;
    }>;
}
