import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreateMetaOptionDto } from './dto/create-meta-option.dto';
import { UpdateMetaOptionDto } from './dto/update-meta-option.dto';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(private readonly metaOptsService: MetaOptionsService) {}

    @Post()
    create(@Body() dto: CreateMetaOptionDto) {
        return this.metaOptsService.create(dto);
    }

    @Get()
    findAll() {
        return this.metaOptsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.metaOptsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateMetaOptionDto) {
        return this.metaOptsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.metaOptsService.remove(+id);
    }
}
