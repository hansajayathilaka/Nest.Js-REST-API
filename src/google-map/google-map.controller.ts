import { Controller, Get, Query } from '@nestjs/common';
import { GoogleMapService } from './google-map.service';
import { LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { AddressDto } from './dto/address.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('google-map')
export class GoogleMapController {
    constructor(private readonly googleMapService: GoogleMapService) {}

    @ApiQuery({ type: AddressDto })
    @Get('coordinates')
    async getCoordinates(@Query() address: AddressDto): Promise<LatLngLiteral> {
        return this.googleMapService.getCoordinates(address);
    }

    @Get('address')
    async getAddress(@Query() coordinates: LatLngLiteral): Promise<string> {
        return this.googleMapService.getAddress(coordinates);
    }
}
