import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Post } from '../posts/entities/post.entity';
import { RolesModule } from '../roles/roles.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comment, Post]), RolesModule],
    controllers: [CommentsController],
    providers: [CommentsService],
})
export class CommentsModule {}
