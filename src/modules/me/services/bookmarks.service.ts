import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsService } from 'src/modules/posts/posts.service';
import { Repository } from 'typeorm';
import { UsersService } from '../../users/providers/users.service';
import { AddBookmarkDto } from '../dto/add-bookmark.dto';
import { Bookmark } from '../entities/bookmark.entity';
import { BookmarkType } from '../enums/bookmark-type.enum';

@Injectable()
export class BookmarkService {
    constructor(
        @InjectRepository(Bookmark)
        private BookmarkRepo: Repository<Bookmark>,
        private readonly userService: UsersService,
        private readonly postService: PostsService,
    ) {}

    async getBookmarksOrFavorites(userId: number, type: BookmarkType) {
        const bookmarks = await this.BookmarkRepo.find({
            where: {
                user: { id: userId },
                type,
            },
            relations: ['post'],
        });
        return bookmarks.map((bookmark) => bookmark.post);
    }

    async addBookmarkOrFavorite(userId: number, dto: AddBookmarkDto) {
        const user = await this.userService.findOne(userId);
        const post = await this.postService.findOne(dto.postId);
        const type = dto.type;

        if (!user || !post) {
            throw new NotFoundException('User or Post not found');
        }

        const bookmarks = this.BookmarkRepo.create({
            user,
            post,
            type,
        });

        return this.BookmarkRepo.save(bookmarks);
    }

    async removeBookmark(id: number) {
        const bookmark = await this.BookmarkRepo.findOne({
            where: { id },
        });

        if (!bookmark) {
            throw new NotFoundException('Bookmark or favorite not found');
        }

        return await this.BookmarkRepo.remove(bookmark);
    }
}
