import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
export class LocationController {
    constructor(private locationService: LocationService){}

    @Get()
    findAll() {
        return this.locationService.findAll()
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.locationService.findOne(id)
    }

    @Post()
    create(@Body() createLocationDto: CreateLocationDto) {
        return this.locationService.create(createLocationDto)
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateLocationDto: UpdateLocationDto) {
        return this.locationService.update(id, updateLocationDto)
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.locationService.delete(id)
    }
}
