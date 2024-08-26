import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Param,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParamId } from 'src/common/decorators/param-id.decorator';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import {
    deleteUserDecorators,
    getUserDecorators,
    getUsersDecorators,
    patchUserDecorators,
    postUserDecorators,
} from './decorators/handlers.decorators';
import { CreateManyUsersDto } from './dto/create-many-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './providers/users.service';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @postUserDecorators()
    create(@Body() dto: CreateUserDto) {
        return this.service.create(dto);
    }

    @getUsersDecorators()
    findAll(@Query() dto: PaginationQueryDto) {
        return this.service.findAll(dto);
    }

    @getUserDecorators()
    findOne(@ParamId() id: number) {
        return this.service.findOne(id);
    }

    @patchUserDecorators()
    update(@Param() id: number, @Body() dto: UpdateUserDto) {
        return this.service.update(id, dto);
    }

    @deleteUserDecorators()
    remove(@ParamId() id: number) {
        return this.service.remove(id);
    }

    @Post('create-many')
    createMany(@Body() dto: CreateManyUsersDto) {
        return this.service.createMany(dto);
    }
}
