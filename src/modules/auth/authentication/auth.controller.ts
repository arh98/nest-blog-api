import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ActiveUser } from '../decorators/active-user.decorator';
import { Auth } from '../decorators/auth-type.decorator';
import { IActiveUser } from '../interfaces/active-user.interface';
import { AuthService } from './auth.service';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthType } from './enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    async logIn(@Body() dto: SignInDto) {
        return this.service.signIn(dto);
    }

    @Post('sign-up')
    async signUp(@Body() dto: SignUpDto) {
        return this.service.signUp(dto);
    }

    @Post('refresh-tokens')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@Body() dto: RefreshTokenDto) {
        return this.service.refreshTokens(dto);
    }

    @Auth(AuthType.Bearer)
    @Patch('change-password')
    async changePassword(
        @ActiveUser() user: IActiveUser,
        @Body() dto: UpdatePasswordDto,
    ) {
        return this.service.updatePassword(user.sub, dto);
    }

    @Auth(AuthType.Bearer)
    @Get('confirm-email')
    async requestConfirmation(@ActiveUser() user: IActiveUser) {
        return this.service.sendConfirmationEmail(user.sub);
    }

    @Post('email/confirm')
    @HttpCode(HttpStatus.OK)
    async confirmEmail(@Body() dto: ConfirmEmailDto) {
        return this.service.confirmEmail(dto.token);
    }

    @Post('forgot/password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.service.forgotPassword(dto.email);
    }

    @Patch('reset/password')
    @HttpCode(HttpStatus.OK)
    resetPassword(
        @Query('token') resetToken: string,
        @Body() dto: ResetPasswordDto,
    ) {
        return this.service.resetPassword(resetToken, dto.newPassword);
    }
}
