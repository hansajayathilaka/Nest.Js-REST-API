import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete, UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Product } from '../model/product.entity';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '../auth/auth.guard';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @UseGuards(AuthGuard)
    @ApiBody({ type: CreateProductDto })
    @ApiOkResponse({
        description: 'Create product record',
        type: Product,
        isArray: false,
    })
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        try {
            const product = this.productsService.create(createProductDto);
            return product;
        } catch (error) {
            return error;
        }
    }

    @ApiOkResponse({
        description: 'Product list',
        type: Product,
        isArray: true,
    })
    @Get()
    findAll() {
        try {
            const products = this.productsService.findAll();
            return products;
        } catch (error) {
            return error;
        }
    }

    @ApiOkResponse({
        description: 'Product object',
        type: Product,
        isArray: false,
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        try {
            const product = this.productsService.findOne(id);
            return product;
        } catch (error) {
            return error;
        }
    }

    @UseGuards(AuthGuard)
    @ApiBody({ type: UpdateProductDto })
    @ApiOkResponse({
        description: 'Update product object',
        type: UpdateResult,
        isArray: false,
    })
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        try {
            const product = this.productsService.update(id, updateProductDto);
            return product;
        } catch (error) {
            return error;
        }
    }

    @UseGuards(AuthGuard)
    @ApiOkResponse({
        description: 'Delete product object',
        type: UpdateResult,
        isArray: false,
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            const product = this.productsService.remove(id);
            return product;
        } catch (error) {
            return error;
        }
    }
}
