import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Stock } from '../model/stock.entity';
import { UpdateResult } from 'typeorm';
import { Public } from '../auth/decorators/public.decorator';

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @ApiBody({ type: CreateStockDto })
    @ApiCreatedResponse({
        description: 'Create stock record',
        type: Stock,
        isArray: false,
    })
    @Post()
    create(@Body() createStockDto: CreateStockDto) {
        try {
            const stock = this.stocksService.create(createStockDto);
            return stock;
        } catch (error) {
            return error;
        }
    }

    @ApiOkResponse({
        description: 'Stock list',
        type: Stock,
        isArray: true,
    })
    @Get()
    @Public()
    findAll() {
        try {
            const stocks = this.stocksService.findAll();
            return stocks;
        } catch (error) {
            return error;
        }
    }

    @ApiOkResponse({
        description: 'Stock object',
        type: Stock,
        isArray: false,
    })
    @Get(':id')
    @Public()
    findOne(@Param('id') id: string) {
        try {
            const stock = this.stocksService.findOne(id);
            return stock;
        } catch (error) {
            return error;
        }
    }

    @ApiBody({ type: UpdateStockDto })
    @ApiOkResponse({
        description: 'Update stock record',
        type: UpdateResult,
        isArray: false,
    })
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
        try {
            const stock = this.stocksService.update(id, updateStockDto);
            return stock;
        } catch (error) {
            return error;
        }
    }

    @ApiOkResponse({
        description: 'Delete stock record',
        type: UpdateResult,
        isArray: false,
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        try {
            const stock = this.stocksService.remove(id);
            return stock;
        } catch (error) {
            return error;
        }
    }
}
