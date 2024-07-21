import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiOperation({
        summary: 'Fetches a list of registered users on the application.',
    })
    @ApiResponse({
        status: 200,
        description: 'Users fetched successfully based on the query',
    })
    @Get()
    findAll(@Query() dto: PaginationQueryDto) {
        return this.usersService.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
