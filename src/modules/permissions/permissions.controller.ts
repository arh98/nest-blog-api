import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { PermissionGuard } from '../auth/authorization/guards/permission.guard';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(PermissionGuard)
@Controller('permissions')
@ApiTags('permissions')
export class PermissionsController {
    constructor(private readonly service: PermissionsService) {}

    @Post()
    create(@Body() dto: CreatePermissionDto) {
        return this.service.create(dto);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@ParamId() id: number) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@ParamId() id: number, @Body() dto: UpdatePermissionDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@ParamId() id: number) {
        return this.service.remove(id);
    }

    @Post('/sync')
    @HttpCode(HttpStatus.OK)
    syncPermissions() {
        return this.service.syncPermissions();
    }
}
