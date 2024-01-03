import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';
import { Stock } from '../model/stock.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Stock])],
    controllers: [StocksController],
    providers: [StocksService],
})
export class StocksModule {}
