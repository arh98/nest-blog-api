import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Post()
    create(@Body() dto: CreatePostDto) {
        return this.postsService.create(dto);
    }

    @Get()
    findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
        return this.postsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
