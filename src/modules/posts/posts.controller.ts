import { Body, Controller, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
    createPostDecorators,
    deletePostDecorators,
    getPostDecorators,
    getPostsDecorators,
    patchPostDecorators,
} from './decorators/handlers.decorators';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { GetPostsDto } from './dto/get-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @createPostDecorators()
    create(@Body() dto: CreatePostDto) {
        return this.postsService.create(dto);
    }

    @getPostsDecorators()
    findAll(@Query() dto: GetPostsDto) {
        return this.postsService.findAll(dto);
    }

    @getPostDecorators()
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id);
    }

    @patchPostDecorators()
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
        return this.postsService.update(id, dto);
    }

    @deletePostDecorators()
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
