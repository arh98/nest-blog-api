import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
    @ApiProperty({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'The number of entries returned per query',
        example: 10,
    })
    @IsOptional()
    @IsPositive()
    readonly limit: number = 10;

    @ApiProperty({
        name: 'page',
        type: 'number',
        required: false,
        description:
            'The position of the page number that you want the API to return',
        example: 1,
    })
    @IsOptional()
    @IsPositive()
    readonly page: number = 1;
}
