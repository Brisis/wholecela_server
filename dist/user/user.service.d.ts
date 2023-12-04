import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(role?: "customer" | "seller" | "admin"): Promise<any[]>;
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
    delete(id: string): Promise<{
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
