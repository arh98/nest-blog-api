import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { TagsService } from 'src/tags/tags.service';

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
            this.postRepo.create({ ...dto, author , tags }),
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

    update(id: number, dto: UpdatePostDto) {
        return `This action updates a #${id} post`;
    }

    async remove(id: number) {
        const post = await this.findOne(id);
        await this.postRepo.delete(post.id);
        return 'Post deleted successfully';
    }
}
