import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { DataResponseInterceptor } from './common/interceptors/data-response.interceptor';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import envValidation from './config/env.validation';
import ormConfig from './config/ormConfig';
import { AuthModule } from './modules/auth/auth.module';
import { AccessTokenGuard } from './modules/auth/authentication/guards/accees-token.guard';
import { AuthenticationGuard } from './modules/auth/authentication/guards/auth.guard';
import { CommentsModule } from './modules/comments/comments.module';
import { MailModule } from './modules/mail/mail.module';
import { MeModule } from './modules/me/me.module';
import { MetaOptionsModule } from './modules/meta-options/meta-options.module';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { UsersModule } from './modules/users/users.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            load: [appConfig, ormConfig],
            validationSchema: envValidation,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: ormConfig,
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 60000,
                limit: 10,
            },
        ]),
        UsersModule,
        PostsModule,
        AuthModule,
        TagsModule,
        MetaOptionsModule,
        PaginationModule,
        CommentsModule,
        MeModule,
        MailModule,
        UploadsModule,
        RolesModule,
        PermissionsModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: DataResponseInterceptor,
        },
        AccessTokenGuard,
    ],
})
export class AppModule {}
