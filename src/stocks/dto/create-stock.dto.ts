import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStockDto {
    @ApiProperty()
    @IsNumber()
    product_id: string;

    @ApiProperty()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsNumber()
    price: number;
}
