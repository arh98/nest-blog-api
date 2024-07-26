import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
        @InjectRepository(MetaOption)
        private readonly metaOptsRepo: Repository<MetaOption>,
    ) {}

    async create(dto: CreatePostDto) {
        return await this.postRepo.save(this.postRepo.create({ ...dto }));
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
