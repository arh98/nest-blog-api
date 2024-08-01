import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/modules/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { TagsService } from 'src/modules/tags/tags.service';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
        private readonly userService: UsersService,
        private readonly tagsService: TagsService,
    ) {}

    async create(dto: CreatePostDto) {
        const author = await this.userService.findOne(dto.authorId);
        const tags = await this.tagsService.findMultiple(dto.tags);

        return await this.postRepo.save(
            this.postRepo.create({ ...dto, author, tags }),
        );
    }

    findAll() {
        return this.postRepo.find();
    }

    async findOne(id: number) {
        const post = await this.postRepo.findOneBy({ id });
        if (!post) {
            throw new NotFoundException('Post not found');
        }
        return post;
    }

    async update(id: number, dto: UpdatePostDto) {
        const post = await this.findOne(id);
        const tags =
            dto.tags && (await this.tagsService.findMultiple(dto.tags));

        post.title = dto.title ?? post.title;
        post.content = dto.content ?? post.content;
        post.status = dto.status ?? post.status;
        post.postType = dto.postType ?? post.postType;
        post.slug = dto.slug ?? post.slug;
        post.featuredImageUrl = dto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = dto.publishOn ?? post.publishOn;

        if (tags) post.tags = tags;

        return await this.postRepo.save(post);
    }

    async remove(id: number) {
        const post = await this.findOne(id);
        await this.postRepo.delete(post.id);
        return 'Post deleted successfully';
    }
}
