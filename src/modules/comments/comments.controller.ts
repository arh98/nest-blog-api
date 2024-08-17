import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    create(@Body() dto: CreateCommentDto) {
        return this.commentsService.create(dto);
    }

    @Get()
    findAll() {
        return this.commentsService.findAll();
    }

    @Get(':id')
    findOne(@ParamId() id: number) {
        return this.commentsService.findOne(id);
    }

    @Patch(':id')
    update(@ParamId() id: number, @Body() dto: UpdateCommentDto) {
        return this.commentsService.update(id, dto);
    }

    @Delete(':id')
    remove(@ParamId() id: number) {
        return this.commentsService.remove(id);
    }

    @Put('approve')
    approveMultiple(@Body() body: { ids: number[] }) {
        return this.commentsService.approveMultiple(body.ids);
    }
}
