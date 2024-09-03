import {
    IsArray,
    IsInt,
    IsNotEmpty,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @MaxLength(70)
    readonly description: string;

    @IsArray()
    @IsInt({ each: true })
    readonly permissions: number[];
}
