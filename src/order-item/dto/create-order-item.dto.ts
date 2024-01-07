import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  
  @IsNotEmpty()
  @IsString()
  orderId: string

  @IsNotEmpty()
  @IsString()
  productId: string
}