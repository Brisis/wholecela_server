import { User } from '@prisma/client';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(role?: "customer" | "seller" | "admin"): Promise<any[]>;
    getLoggedUser(user: User): {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        imageUrl: string;
        email: string;
        role: string;
        hashedPassword: string;
        locationId: string;
        street: string;
        latlng: string;
    };
    findOne(id: string, role?: "customer" | "seller" | "admin"): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        imageUrl: string;
        email: string;
        role: string;
        hashedPassword: string;
        locationId: string;
        street: string;
        latlng: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        imageUrl: string;
        email: string;
        role: string;
        hashedPassword: string;
        locationId: string;
        street: string;
        latlng: string;
    }>;
}
