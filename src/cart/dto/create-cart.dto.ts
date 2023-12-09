import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateCartDto {
  @IsArray()
  @IsOptional()
  cartItems: any;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  sellerId: string;
}