import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  cartId: string;

  @IsString()
  @IsNotEmpty()
  productId: string;
}