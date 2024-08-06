import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';

export class CreateManyUsersDto {
    @ApiProperty({
        type: 'array',
        required: true,
        items: {
            type: 'User',
        },
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateUserDto)
    readonly users: CreateUserDto[];
}
