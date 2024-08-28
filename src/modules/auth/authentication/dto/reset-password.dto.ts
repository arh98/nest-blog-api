import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { IsEqualTo } from 'src/common/decorators/is-equal.decorator';

export class ResetPasswordDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    @Matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
        {
            message:
                'password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
        },
    )
    readonly newPassword: string;

    @IsNotEmpty()
    @IsEqualTo('newPassword')
    readonly confirmPassword: string;
}
