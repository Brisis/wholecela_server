import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationController {
    private locationService;
    constructor(locationService: LocationService);
    findAll(): Promise<{
        id: string;
        name: string;
        city: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createLocationDto: CreateLocationDto): Promise<{
        id: string;
        name: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<{
        id: string;
        name: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        city: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
