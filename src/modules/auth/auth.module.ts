import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './authentication/auth.controller';
import { AuthService } from './authentication/auth.service';
import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hash.service';
import { RefreshTokenIdsStorage } from './authentication/services/refresh-token-ids.service';

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        RefreshTokenIdsStorage,
    ],
    imports: [
        forwardRef(() => UsersModule),
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider()),
    ],
    exports: [
        AuthService,
        HashingService,
        //to use acc guard :
        ConfigModule,
        JwtModule,
    ],
})
export class AuthModule {}
