import {
    BadRequestException,
    forwardRef,
    Inject,
    Injectable,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { MailService } from 'src/modules/mail/mail.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/providers/users.service';
import jwtConfig from '../config/jwt.config';
import { HashingService } from '../hashing/hash.service';
import { IActiveUser } from '../interfaces/active-user.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { RefreshTokenIdsStorage } from './services/refresh-token-ids.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly hashService: HashingService,
        private readonly jwtService: JwtService,
        private readonly idsStorage: RefreshTokenIdsStorage,
        @Inject(jwtConfig.KEY)
        private readonly jwtConf: ConfigType<typeof jwtConfig>,
        private readonly mailer: MailService,
    ) {}

    async signUp(dto: CreateUserDto) {
        const user = await this.userService.create(dto);
        this.mailer.sendUserWelcome(user);
        return {
            message: `User ${user.id} signed up successfully`,
            tokens: await this.generateTokens(user),
        };
    }

    async signIn(dto: SignInDto) {
        const user = await this.userService.findOneBy({
            email: dto.email,
        });

        const isPasswordValid = user
            ? await this.isPasswordCorrect(dto.password, user.password)
            : false;

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        return await this.generateTokens(user);
    }

    async generateTokens(user: User) {
        const refreshTokenId = randomUUID();

        const refreshTokenExp = this.jwtConf.refreshTokenTtl;

        const accTokenExp = this.jwtConf.accessTokenTtl;
        const secret = this.jwtConf.secret;

        const [accessToken, refreshToken] = await Promise.all([
            this.signToken<Partial<IActiveUser>>(user.id, accTokenExp, secret, {
                email: user.email,
                // role: user.role,
                // make jwt heavy!!
                // permissions: user.permissions
            }),
            this.signToken(user.id, refreshTokenExp, secret, {
                refreshTokenId,
            }),
        ]);
        await this.idsStorage.insert(user.id, refreshTokenId);

        return { accessToken, refreshToken };
    }

    async refreshTokens(dto: RefreshTokenDto) {
        try {
            const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
                Pick<IActiveUser, 'sub'> & { refreshTokenId: string }
            >(dto.refreshToken, {
                secret: this.jwtConf.secret,
                audience: this.jwtConf.audience,
                issuer: this.jwtConf.issuer,
            });
            const user = await this.userService.findOne(sub);

            const isValid = await this.idsStorage.validate(
                user.id,
                refreshTokenId,
            );
            if (isValid) {
                await this.idsStorage.invalidate(user.id);
            } else {
                throw new Error('Refresh Token is invalid');
            }
            return this.generateTokens(user);
        } catch (err) {
            // if (err instanceof InvalidateRefreshTokenError) {
            throw new UnauthorizedException(err.message, ' Access denied!');
            // }
            // throw new UnauthorizedException();
        }
    }

    async updatePassword(userId: number, dto: UpdatePasswordDto) {
        const user = await this.userService.findOne(userId);

        await this.isPasswordCorrect(dto.currentPassword, user.password);

        await this.userService.updatePassword(user.id, dto.newPassword);

        return { message: 'Password updated successfully' };
    }

    async forgotPassword(email: string) {
        const user = await this.userService.findOneBy({ email });

        if (user) {
            const expIn = 3600;
            const secret = this.jwtConf.resetPasswordSecret;

            const resetToken = await this.signToken(user.id, expIn, secret);

            user.resetTokenValidityDate = new Date(Date.now() + expIn * 1000);
            await this.userService.saveChanges(user);
            await this.mailer.sendPasswordResetEmail(user, resetToken);
        }

        return {
            message:
                'If the email is registered, you will receive a password reset link shortly.',
        };
    }

    async resetPassword(resetToken: string, newPassword: string) {
        try {
            const decoded = await this.jwtService.verifyAsync(resetToken, {
                secret: this.jwtConf.resetPasswordSecret,
            });

            const userId = decoded.sub;

            const user = await this.userService.findOne(userId);

            if (Date.now() > user.resetTokenValidityDate.getTime()) {
                throw new Error('Reset token has expired');
            }

            user.password = await this.hashService.hash(newPassword);
            user.resetTokenValidityDate = null;
            user.passwordChangedAt = new Date(Date.now());
            await this.userService.saveChanges(user);

            return {
                message: 'Password has been reset successfully.',
            };
        } catch (error) {
            throw new BadRequestException('Invalid or expired reset token');
        }
    }

    async confirmEmail(token: string) {
        let userId: number;

        try {
            const jwtData = await this.jwtService.verifyAsync<{
                confirmEmailUserId: number;
            }>(token, {
                secret: this.jwtConf.confirmEmailSecret,
            });
            userId = jwtData.confirmEmailUserId;
        } catch {
            throw new UnprocessableEntityException('Invalid token ');
        }

        const user = await this.userService.findOne(userId);

        if (user.emailConfirmed) {
            throw new BadRequestException('Email is already confirmed');
        }

        user.emailConfirmed = true;
        await this.userService.saveChanges(user);
        return { message: 'Email confirmed successfully!' };
    }

    async sendConfirmationEmail(userId: number) {
        const token = await this.generateEmailConfirmationToken(userId);
        const user = await this.userService.findOne(userId);

        await this.mailer.sendConfirmationEmail(user, token);

        return { message: 'Confirmation email sent! Please check your inbox.' };
    }

    async generateEmailConfirmationToken(userId: number) {
        const expiresIn = 3600;
        const secret = this.jwtConf.confirmEmailSecret;

        return this.signToken(userId, expiresIn, secret, {
            confirmEmailUserId: userId,
        });
    }

    private async isPasswordCorrect(inputPasswd: string, userPasswd: string) {
        const isEqual = await this.hashService.compare(inputPasswd, userPasswd);
        if (!isEqual) {
            throw new UnauthorizedException('Wrong password');
        }
        return isEqual;
    }

    private async signToken<T>(
        userId: number,
        expiresIn: number,
        secret: string,
        payload?: T,
    ) {
        return await this.jwtService.signAsync(
            {
                sub: userId,
                ...payload,
            },
            {
                audience: this.jwtConf.audience,
                issuer: this.jwtConf.issuer,
                secret,
                expiresIn,
            },
        );
    }
}
