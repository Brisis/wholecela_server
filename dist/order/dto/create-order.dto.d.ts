import { Status } from "@prisma/client";
export declare class CreateOrderDto {
    status: Status;
    totalPrice: number;
    userId: string;
    locationId: string;
}
