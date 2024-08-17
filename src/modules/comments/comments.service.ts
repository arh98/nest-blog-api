import {
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
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
        private readonly commentsRepo: Repository<Comment>,
        @InjectRepository(Post)
        private readonly postsRepo: Repository<Post>,
        private readonly dataSource: DataSource,
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

    findAll(): Promise<Comment[]> {
        return this.commentsRepo.find({
            relations: ['post', 'author'],
        });
    }

    async findMultiple(ids: number[]): Promise<Comment[]> {
        return await this.commentsRepo.find({
            where: {
                id: In(ids),
            },
        });
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
        // admin access only
        comment.approved = dto.approved ?? comment.approved;
        comment.edited = true;

        return this.commentsRepo.save(comment);
    }

    async remove(id: number): Promise<void> {
        const comment = await this.findOne(id);

        await this.commentsRepo.remove(comment);
    }

    async approveMultiple(ids: number[]) {
        const comments = await this.findMultiple(ids);
        const qr = this.dataSource.createQueryRunner();
        try {
            await qr.connect();
            await qr.startTransaction();
            for (const comment of comments) {
                comment.approved = true;
            }
            await qr.manager.save(comments);

            await qr.commitTransaction();
        } catch (error) {
            await qr.rollbackTransaction();
            throw new RequestTimeoutException('Operation timed out!');
        } finally {
            try {
                await qr.release();
                return 'Operation completed successfully!';
            } catch (error) {
                throw new RequestTimeoutException(
                    'Could not release the query runner connection',
                );
            }
        }
    }
}
