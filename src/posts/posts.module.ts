import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [UsersModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
