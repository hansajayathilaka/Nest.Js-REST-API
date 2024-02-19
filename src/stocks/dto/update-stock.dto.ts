import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { IsNumber } from 'class-validator';

export class UpdateStockDto extends PartialType(CreateStockDto) {
    @ApiProperty()
    @IsNumber()
    id: string;
}
