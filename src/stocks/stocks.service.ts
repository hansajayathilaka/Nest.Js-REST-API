import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../model/product.entity';
import { Stock } from '../model/stock.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class StocksService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,

        @InjectRepository(Stock)
        private stockRepository: Repository<Stock>,
    ) {}

    async create(createStockDto: CreateStockDto): Promise<Stock> {
        try {
            const product = await this.productRepository.findOne({
                where: { id: createStockDto.product_id },
            });

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            const _stock = await this.stockRepository.save({ ...createStockDto, product });
            return _stock;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<Stock[]> {
        try {
            const stocks = await this.stockRepository.find({
                relations: ['product'],
            });
            return stocks;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: string): Promise<Stock> {
        try {
            const stock = await this.stockRepository.findOne({
                where: { id },
                relations: ['product'],
            });
            if (stock) {
                return stock;
            } else {
                throw new NotFoundException('Stock not found');
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async update(
        id: string,
        updateStockDto: UpdateStockDto,
    ): Promise<UpdateResult> {
        try {
            const stock = await this.stockRepository.findOne({
                where: { id },
            });

            if (!stock) {
                throw new NotFoundException('Stock not found');
            }
            const result = await this.stockRepository.update(
                stock,
                updateStockDto,
            );
            return result;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const stock = await this.stockRepository.findOne({
                where: { id },
            });

            if (!stock) {
                throw new NotFoundException('Stock not found');
            }

            const _stock = await this.stockRepository.softDelete(id);
            return _stock;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}
