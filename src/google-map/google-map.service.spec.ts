import { Test, TestingModule } from '@nestjs/testing';
import { GoogleMapService } from './google-map.service';

describe('GoogleMapService', () => {
    let service: GoogleMapService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [GoogleMapService],
        }).compile();

        service = module.get<GoogleMapService>(GoogleMapService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
