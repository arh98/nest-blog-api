import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationService } from 'src/common/pagination/pagination.service';
import { TagsService } from 'src/modules/tags/tags.service';
import { UsersService } from 'src/modules/users/providers/users.service';
import { EntityManager, Repository } from 'typeorm';
import { IActiveUser } from '../auth/interfaces/active-user.interface';
import { Comment } from '../comments/entities/comment.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsDto } from './dto/get-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostStatus } from './enums/post-status.enum';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';

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

    async create(userId: number, dto: CreatePostDto) {
        const author = await this.userService.findOne(userId);
        const tags = await this.tagService.findMultiple(dto.tags);
        if (dto.tags.length !== tags.length) {
            throw new BadRequestException('Please check your tag Ids');
        }
        try {
            return await this.postRepo.save(
                this.postRepo.create({ ...dto, author, tags }),
            );
        } catch (error) {
            console.error('Error saving post:', error);
            throw new ConflictException(
                'Post could not be saved. Ensure the slug is unique.',
            );
        }
    }

    async findUnpublishedPosts(dto: GetPostsDto) {
        return this.paginatePosts(dto, null);
    }

    async findPublishedPosts(dto: GetPostsDto) {
        return this.paginatePosts(dto, PostStatus.PUBLISHED);
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

    async update(user: IActiveUser, id: number, dto: UpdatePostDto) {
        const userObj = await this.userService.findOne(user.sub);
        let post = await this.findOne(id);

        if (userObj.id !== post.author.id) {
            throw new ForbiddenException(
                'You are not authorized to update this post',
            );
        }
        const tags = dto.tags && (await this.tagService.findMultiple(dto.tags));

        post = this.mapDtoToPost(post, dto);
        if (tags) post.tags = tags;

        return await this.postRepo.save(post);
    }

    async updatePostStatus(id: number, dto: UpdatePostStatusDto) {
        const post = await this.findOne(id);
        post.status = dto.status;
        return await this.postRepo.save(post);
    }

    async remove(id: number) {
        const post = await this.findOne(id);
        await this.postRepo.delete(post.id);
        return 'Post deleted successfully';
    }

    private async paginatePosts(dto: GetPostsDto, status: PostStatus | null) {
        const queryBuilder = this.postRepo
            .createQueryBuilder('post')
            .leftJoinAndSelect('post.author', 'author')
            .leftJoinAndSelect('post.tags', 'tags');

        if (status !== null) {
            queryBuilder.where('post.status = :status', { status });
        }

        queryBuilder.select(['post', 'author.id', 'tags.id']);

        return this.paginationService.paginateQuery(
            { limit: dto.limit, page: dto.page },
            queryBuilder,
        );
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
