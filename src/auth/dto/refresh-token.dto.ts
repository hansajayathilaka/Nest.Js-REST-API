import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly refresh: string;
}
