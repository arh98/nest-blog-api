import { Body, Controller, Param } from '@nestjs/common';
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

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @createPostDecorators()
    create(@Body() dto: CreatePostDto) {
        return this.postsService.create(dto);
    }

    @getPostsDecorators()
    findAll() {
        return this.postsService.findAll();
    }

    @getPostDecorators()
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }

    @patchPostDecorators()
    update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
        return this.postsService.update(+id, dto);
    }

    @deletePostDecorators()
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
