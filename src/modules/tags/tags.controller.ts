import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/decorators/param-id.decorator';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @Post()
    create(@Body() dto: CreateTagDto) {
        return this.tagsService.create(dto);
    }

    @Get()
    findAll() {
        return this.tagsService.findAll();
    }

    @Get(':id')
    findOne(@ParamId() id: number) {
        return this.tagsService.findOne(id);
    }

    @Patch(':id')
    update(@ParamId() id: number, @Body() dto: UpdateTagDto) {
        return this.tagsService.update(id, dto);
    }

    @Delete(':id')
    remove(@ParamId() id: number) {
        return this.tagsService.remove(id);
    }
}
