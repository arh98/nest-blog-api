import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/common/transformers/lower-case.transformer';

export class ForgotPasswordDto {
    @ApiProperty({ example: 'test1@example.com', type: String })
    @Transform(lowerCaseTransformer)
    @IsEmail()
    email: string;
}
