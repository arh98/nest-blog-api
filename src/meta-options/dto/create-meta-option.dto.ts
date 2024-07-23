import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaOptionDto {
    @ApiProperty({
        description: 'The value of the meta option - json',
    })
    @IsNotEmpty()
    @IsJSON()
    value: string;
}
