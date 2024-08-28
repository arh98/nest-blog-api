import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
    @ApiProperty({
        description: 'Confirm token received from the server',
    })
    @IsNotEmpty()
    @IsString()
    token: string;
}
