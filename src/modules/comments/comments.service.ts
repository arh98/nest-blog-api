import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Post } from '../posts/entities/post.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepo: Repository<Comment>,
        @InjectRepository(Post)
        private postsRepo: Repository<Post>,
        // @InjectRepository(User)
        // private usersRepository: Repository<User>,
    ) {}

    async create(dto: CreateCommentDto) {
        const post = await this.postsRepo.findOne({
            where: { id: dto.postId },
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        const comment = this.commentsRepo.create({
            ...dto,
            post,
            author: { id: 1 }, // for now
        });

        return this.commentsRepo.save(comment);
    }

    async findAll(): Promise<Comment[]> {
        return this.commentsRepo.find({ relations: ['post', 'author'] });
    }

    async findOne(id: number): Promise<Comment> {
        const comment = await this.commentsRepo.findOne({
            where: { id },
            relations: ['post', 'author'],
        });

        if (!comment) {
            throw new NotFoundException('Comment not found');
        }

        return comment;
    }

    async update(id: number, dto: UpdateCommentDto): Promise<Comment> {
        const comment = await this.findOne(id);

        comment.content = dto.content ?? comment.content;
        comment.replyToId = dto.replyToId ?? comment.replyToId;
        comment.edited = true;

        return this.commentsRepo.save(comment);
    }

    async remove(id: number): Promise<void> {
        const comment = await this.findOne(id);

        await this.commentsRepo.remove(comment);
    }
}
