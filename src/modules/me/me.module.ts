import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';
import { Follow } from './entities/follow.entity';
import { BookmarkService } from './services/bookmarks.service';
import { FollowService } from './services/follow.service';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { MeController } from './me.controller';

@Module({
    controllers: [MeController],
    providers: [BookmarkService, FollowService],
    imports: [
        TypeOrmModule.forFeature([Bookmark, Follow]),
        UsersModule,
        PostsModule,
    ],
})
export class MeModule {}
