import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    Query,
    UseInterceptors
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
import { CreateMultipleUsersDto } from './dto/create-multiple-user.dto';
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
    update(@ParamId() id: number, @Body() dto: UpdateUserDto) {
        return this.service.update(id, dto);
    }

    @deleteUserDecorators()
    remove(@ParamId() id: number) {
        return this.service.remove(id);
    }

    @Post('create-many')
    createMany(@Body() dto: CreateMultipleUsersDto) {
        return this.service.createMultiple(dto);
    }
}
