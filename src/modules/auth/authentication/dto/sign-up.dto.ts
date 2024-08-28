import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class SignUpDto {
    @IsEmail()
    readonly email: string;

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
    readonly password: string;
}
