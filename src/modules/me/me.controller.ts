import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { AddBookmarkDto } from './dto/add-bookmark.dto';
import { BookmarkType } from './enums/bookmark-type.enum';
import { BookmarkService } from './services/bookmarks.service';
import { FollowService } from './services/follow.service';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { IActiveUser } from '../auth/interfaces/active-user.interface';
import { MeService } from './services/me.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('me')
@ApiTags('me')
@UseInterceptors(ClassSerializerInterceptor)
export class MeController {
    constructor(
        private readonly bookmarkService: BookmarkService,
        private readonly followService: FollowService,
        private readonly meService: MeService,
    ) {}

    @Get()
    async getMe(@ActiveUser() user: IActiveUser) {
        return this.meService.myProfile(user.sub);
    }

    @Patch()
    async updateMe(
        @ActiveUser() user: IActiveUser,
        @Body() dto: UpdateUserDto,
    ) {
        return this.meService.updateMe(user.sub, dto);
    }

    @Delete()
    async deleteMe(@ActiveUser() user: IActiveUser) {
        return this.meService.deleteMe(user.sub);
    }

    @Get('bookmarks')
    async getBookmarksOrFavorites(
        @ActiveUser() user: IActiveUser,
        @Query('type') type?: string,
    ) {
        const bookmarkType =
            type === 'favorites'
                ? BookmarkType.FAVORITE
                : BookmarkType.BOOKMARK;

        return this.bookmarkService.getBookmarksOrFavorites(
            user.sub,
            bookmarkType,
        );
    }

    @Post('bookmarks')
    async addBookmark(
        @ActiveUser() user: IActiveUser,
        @Body() dto: AddBookmarkDto,
    ) {
        return this.bookmarkService.addBookmarkOrFavorite(user.sub, dto);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('bookmarks/:bookmarkId')
    async removeBookmark(
        @ActiveUser() user: IActiveUser,
        @ParamId('bookmarkId') bookmarkId: number,
    ) {
        return this.bookmarkService.removeBookmark(user.sub, bookmarkId);
    }

    @Post('follow/:userId')
    async follow(
        @ActiveUser() user: IActiveUser,
        @ParamId('userId') id: number,
    ) {
        return this.followService.follow(user.sub, id);
    }

    @Delete('unfollow/:userId')
    async unfollow(
        @ActiveUser() user: IActiveUser,
        @ParamId('userId') id: number,
    ) {
        return this.followService.unfollow(user.sub, id);
    }

    @Get('followers')
    async getFollowers(@ActiveUser() user: IActiveUser) {
        return this.followService.getFollowers(user.sub);
    }

    @Get('following')
    async getFollowing(@ActiveUser() user: IActiveUser) {
        return this.followService.getFollowing(user.sub);
    }
}
