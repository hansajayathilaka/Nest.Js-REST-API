import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../model/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        try {
            const product = this.productRepository.save(createProductDto);
            return product;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            const products = await this.productRepository.find({
                relations: ['stocks'],
            });
            return products;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async findOne(id: string): Promise<Product> {
        try {
            const product = await this.productRepository.findOne({
                where: { id },
                relations: ['stocks'],
            });
            if (product) {
                return product;
            } else {
                console.error('Product not found');
                throw new NotFoundException('Product not found');
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async update(
        id: string,
        updateProductDto: UpdateProductDto,
    ): Promise<UpdateResult> {
        try {
            const product = await this.productRepository.findOne({
                where: { id },
            });
            if (product) {
                const result: UpdateResult =
                    await this.productRepository.update(
                        product,
                        updateProductDto,
                    );
                return result;
            } else {
                console.error('Product not found');
                throw new NotFoundException('Product not found');
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const product = await this.productRepository.findOne({
                where: { id },
            });
            if (product) {
                const result: UpdateResult =
                    await this.productRepository.softDelete(id);
                return result;
            } else {
                console.error('Product not found');
                throw new NotFoundException('Product not found');
            }
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}
