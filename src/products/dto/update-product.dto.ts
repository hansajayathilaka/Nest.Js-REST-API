import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty()
    @IsNumber()
    id: string;
}
