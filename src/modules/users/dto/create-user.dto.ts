import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'The first name of the user',
        example: 'John',
        minLength: 3,
        maxLength: 96,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    firstName: string;

    @ApiProperty({
        description: 'The last name of the user (optional)',
        example: 'Doe',
        minLength: 3,
        maxLength: 96,
        required: false,
    })
    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastName?: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The bio of the user',
        example: '21 y.o. , designer from san francisco',
    })
    @IsString()
    @IsOptional()
    bio: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'MyStrongPassword123!',
        minLength: 6,
        pattern:
            '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$',
        format: 'password',
    })
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'Minimum six characters, at least one letter, one number and one special character',
    })
    password: string;
}
