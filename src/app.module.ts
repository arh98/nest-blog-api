import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { MetaOptionsModule } from './modules/meta-options/meta-options.module';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { UsersModule } from './modules/users/users.module';

@Module({
    imports: [
        UsersModule,
        PostsModule,
        AuthModule,
        TypeOrmModule.forRootAsync({
            imports: [],
            inject: [],
            useFactory: () => ({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'p4321',
                database: 'nestblog',
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        TagsModule,
        MetaOptionsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
