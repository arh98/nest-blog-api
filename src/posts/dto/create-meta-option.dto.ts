import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMetaOptionDto {
    @ApiProperty({
        description: 'The key of the meta option',
        example: 'author',
    })
    @IsString()
    key: string;

    @ApiProperty({
        description: 'The value of the meta option',
        example: 'John Doe',
    })
    @IsNotEmpty()
    value: any;
}
