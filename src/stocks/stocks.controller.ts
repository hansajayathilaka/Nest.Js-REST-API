import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Stock } from '../model/stock.entity';
import { UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('stocks')
export class StocksController {
    constructor(private readonly stocksService: StocksService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: CreateStockDto })
    @ApiOkResponse({
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
    findOne(@Param('id') id: string) {
        try {
            const stock = this.stocksService.findOne(id);
            return stock;
        } catch (error) {
            return error;
        }
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
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
