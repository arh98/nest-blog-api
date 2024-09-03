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
import { ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { PermissionGuard } from '../auth/authorization/guards/permission.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@UseGuards(PermissionGuard)
@Controller('roles')
@ApiTags('roles')
export class RolesController {
    constructor(private readonly service: RolesService) {}

    @Post()
    create(@Body() dto: CreateRoleDto) {
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
    update(@ParamId() id: number, @Body() dto: UpdateRoleDto) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@ParamId() id: number) {
        return this.service.remove(id);
    }
}
