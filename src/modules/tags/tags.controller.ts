import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { AuthType } from '../auth/authentication/enums/auth-type.enum';
import { Auth } from '../auth/decorators/auth-type.decorator';

@Controller('tags')
@ApiTags('Tags')
export class TagsController {
    constructor(private readonly service: TagsService) {}

    @Post()
    create(@Body() dto: CreateTagDto) {
        return this.service.create(dto);
    }

    @Get()
    @Auth(AuthType.None)
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    @Auth(AuthType.None)
    findOne(@ParamId() id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@ParamId() id: number, @Body() dto: UpdateTagDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@ParamId() id: number) {
        return this.service.remove(id);
    }
}
