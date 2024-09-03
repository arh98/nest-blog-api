import { Body, Controller, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { AuthType } from '../auth/authentication/enums/auth-type.enum';
import { PermissionGuard } from '../auth/authorization/guards/permission.guard';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { IActiveUser } from '../auth/interfaces/active-user.interface';
import {
    createPostDecorators,
    deletePostDecorators,
    findUnpublishedDecorators,
    getPostDecorators,
    getPostsDecorators,
    patchPostDecorators,
    updatePostStatusDecorators,
} from './decorators/handlers.decorators';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsDto } from './dto/get-post.dto';
import { UpdatePostStatusDto } from './dto/update-post-status.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(private readonly service: PostsService) {}

    @createPostDecorators()
    create(@ActiveUser() user: IActiveUser, @Body() dto: CreatePostDto) {
        return this.service.create(user.sub, dto);
    }

    @Auth(AuthType.None)
    @getPostsDecorators()
    findAll(@Query() dto: GetPostsDto) {
        return this.service.findPublishedPosts(dto);
    }

    @UseGuards(PermissionGuard)
    @findUnpublishedDecorators()
    findUnpublished(@Query() dto: GetPostsDto) {
        return this.service.findUnpublishedPosts(dto);
    }

    @Auth(AuthType.None)
    @getPostDecorators()
    findOne(@ParamId() id: number) {
        return this.service.findOne(id);
    }

    @patchPostDecorators()
    update(
        @ParamId() id: number,
        @ActiveUser() user: IActiveUser,
        @Body() dto: UpdatePostDto,
    ) {
        return this.service.update(user, id, dto);
    }

    @UseGuards(PermissionGuard)
    @updatePostStatusDecorators()
    updatePostStatus(@ParamId() id: number, @Body() dto: UpdatePostStatusDto) {
        return this.service.updatePostStatus(id, dto);
    }

    @deletePostDecorators()
    remove(@ParamId() id: number) {
        return this.service.remove(id);
    }
}
