import { Body, Controller, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @postUserDecorators()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @getUsersDecorators()
    findAll(@Query() dto: PaginationQueryDto) {
        return this.usersService.findAll(dto);
    }

    @getUserDecorators()
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @patchUserDecorators()
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(+id, dto);
    }

    @deleteUserDecorators()
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }

    @Post('create-many')
    createMany(@Body() dto: CreateManyUsersDto) {
        return this.usersService.createMany(dto);
    }
}
