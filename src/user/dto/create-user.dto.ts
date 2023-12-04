import { IsEmail, IsEnum, IsString, IsNotEmpty, IsOptional, IsLatitude, IsLongitude, IsLatLong } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsLatLong()
    @IsNotEmpty()
    latlng: string;

    @IsString()
    @IsNotEmpty()
    locationId: string;

    @IsEnum(['customer','seller','admin'], {
        message: "Valid role required"
    })
    @IsOptional()
    role: "customer" | "seller" | "admin";
}