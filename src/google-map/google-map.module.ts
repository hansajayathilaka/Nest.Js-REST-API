import { Module } from '@nestjs/common';
import { GoogleMapService } from './google-map.service';
import { GoogleMapController } from './google-map.controller';

@Module({
    controllers: [GoogleMapController],
    providers: [GoogleMapService],
})
export class GoogleMapModule {}
