import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Query,
} from '@nestjs/common';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { BookmarkType } from './enums/bookmark-type.enum';
import { BookmarkService } from './services/bookmarks.service';
import { FollowService } from './services/follow.service';

@Controller('me')
export class MeController {
    constructor(
        private readonly bookmarkService: BookmarkService,
        private readonly followService: FollowService,
    ) {}

    @Get('bookmarks/:userId')
    async getBookmarksOrFavorites(
        @ParamId('userId') userId: number,
        @Query('type') type?: string,
    ) {
        const bookmarkType =
            type === 'favorites'
                ? BookmarkType.FAVORITE
                : BookmarkType.BOOKMARK;

        return this.bookmarkService.getBookmarksOrFavorites(
            userId,
            bookmarkType,
        );
    }

    @Post('bookmarks')
    async addBookmark(@Body() dto: AddBookmarkDto) {
        return this.bookmarkService.addBookmarkOrFavorite(dto.userId, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('bookmarks/:bookmarkId')
    async removeBookmark(@ParamId('bookmarkId') bookmarkId: number) {
        return this.bookmarkService.removeBookmark(bookmarkId);
    }

    @Post('follow/:userId')
    async follow(@ParamId('userId') id: number) {
        const myId = 2; // for now
        return this.followService.follow(myId, id);
    }

    @Delete('unfollow/:userId')
    async unfollow(@ParamId('userId') id: number) {
        const myId = 2; // for now
        return this.followService.unfollow(myId, id);
    }

    @Get('followers/:userId')
    async getFollowers(@ParamId('userId') userId: number) {
        return this.followService.getFollowers(userId);
    }

    @Get('following/:userId')
    async getFollowing(@ParamId('userId') userId: number) {
        return this.followService.getFollowing(userId);
    }
}
