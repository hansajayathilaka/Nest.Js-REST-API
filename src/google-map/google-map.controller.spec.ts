import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMapController } from './google-map.controller';
import { GoogleMapService } from './google-map.service';

describe('GoogleMapController', () => {
    let controller: GoogleMapController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GoogleMapController],
            providers: [GoogleMapService],
        }).compile();

        controller = module.get<GoogleMapController>(GoogleMapController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
