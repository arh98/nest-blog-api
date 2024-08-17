import { Body, Controller, Post } from '@nestjs/common';
import { CreateMetaOptionDto } from './dto/create-meta-option.dto';
import { MetaOptionsService } from './meta-options.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('meta-options')
@ApiTags('meta-options')
export class MetaOptionsController {
    constructor(private readonly metaOptsService: MetaOptionsService) {}

    @Post()
    create(@Body() dto: CreateMetaOptionDto) {
        return this.metaOptsService.create(dto);
    }
}
