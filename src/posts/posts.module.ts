import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [UsersModule, TagsModule, TypeOrmModule.forFeature([Post])],
})
export class PostsModule {}
