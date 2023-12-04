import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  hexCode: string;
}