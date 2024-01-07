import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
export declare class ColorService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        hexCode: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        hexCode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createColorDto: CreateColorDto): Promise<{
        id: string;
        name: string;
        hexCode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateColorDto: UpdateColorDto): Promise<{
        id: string;
        name: string;
        hexCode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        hexCode: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
