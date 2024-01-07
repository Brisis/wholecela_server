import { Status } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {
  @IsNotEmpty()
  status: Status;
  
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number

  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  locationId: string
}