import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from '../auth/decorators/active-user.decorator';
import { IActiveUser } from '../auth/interfaces/active-user.interface';
import { PermissionGuard } from '../auth/authorization/guards/permission.guard';
import { UnrestrictedAccess } from '../auth/authorization/decorators/unrestricted-access.decorator';

@UseGuards(PermissionGuard)
@Controller('comments')
@ApiTags('comments')
export class CommentsController {
    constructor(private readonly service: CommentsService) {}

    @UnrestrictedAccess()
    @Post()
    create(@ActiveUser() user: IActiveUser, @Body() dto: CreateCommentDto) {
        return this.service.create(user.sub, dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@ParamId() id: number) {
        return this.service.findOne(id);
    }

    @UnrestrictedAccess()
    @Patch(':id')
    update(
        @ParamId() id: number,
        @ActiveUser()
        user: IActiveUser,
        @Body() dto: UpdateCommentDto,
    ) {
        return this.service.update(user, id, dto);
    }

    @Delete(':id')
    remove(@ParamId() id: number) {
        return this.service.remove(id);
    }

    @Put('approve')
    approveMultiple(@Body() body: { ids: number[] }) {
        return this.service.approveMultiple(body.ids);
    }
}
