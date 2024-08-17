import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { TagsService } from 'src/modules/tags/tags.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { EntityManager, Repository } from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostStatus } from './enums/post-status.enum';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepo: Repository<Post>,
        private readonly userService: UsersService,
        private readonly tagService: TagsService,
        private readonly paginationService: PaginationService,
        private readonly manager: EntityManager,
    ) {}

    async create(dto: CreatePostDto) {
        const author = await this.userService.findOne(dto.authorId);
        const tags = await this.tagService.findMultiple(dto.tags);

        return await this.postRepo.save(
            this.postRepo.create({ ...dto, author, tags }),
        );
    }
    async findAll(dto: GetPostsDto) {
        const queryBuilder = this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.tags', 'tags')
            // .where('post.status = :status', { status: PostStatus.PUBLISHED })
            .select(['post', 'author.id', 'tags.id']);

        return this.paginationService.paginateQuery(
            { limit: dto.limit, page: dto.page },
            queryBuilder,
        );
    }

    async findAllWithRelations(dto: GetPostsDto) {
        return this.paginationService.paginateQuery(
            { limit: dto.limit, page: dto.page },
            this.postRepo,
            ['author', 'tags', 'me', 'comments'],
        );
    }

    async findOne(id: number) {
        const post = await this.postRepo.findOne({
            where: {
                id,
                status: PostStatus.PUBLISHED,
            },
            relations: ['metaOptions', 'author', 'tags'],
        });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        post.comments = await this.manager.find(Comment, {
            where: {
                post: { id },
                approved: true,
            },
        });
        return post;
    }

    async update(id: number, dto: UpdatePostDto) {
        const isAdmin = true; // for now
        let post = await this.findOne(id);
        const tags = dto.tags && (await this.tagService.findMultiple(dto.tags));

        post = this.mapDtoToPost(post, dto);
        if (isAdmin) post.status = dto.status ?? post.status;
        if (tags) post.tags = tags;

        return await this.postRepo.save(post);
    }

    async remove(id: number) {
        const post = await this.findOne(id);
        await this.postRepo.delete(post.id);
        return 'Post deleted successfully';
    }

    private mapDtoToPost(post: Post, dto: UpdatePostDto): Post {
        post.title = dto.title ?? post.title;
        post.content = dto.content ?? post.content;
        post.postType = dto.postType ?? post.postType;
        post.slug = dto.slug ?? post.slug;
        post.featuredImageUrl = dto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = dto.publishOn ?? post.publishOn;

        return post;
    }
}
