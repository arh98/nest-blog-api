import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';
import { ControllerNames } from 'src/modules/permissions/enums/controller-names.enum';
import { CommonHandlers, SpecificHandlers } from '../enums/handler-names.enum';

export class CreatePermissionDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50, { message: 'Name must be at most 50 characters long.' })
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255, {
        message: 'Description must be at most 255 characters long.',
    })
    description: string;

    @IsOptional()
    @IsString()
    @MaxLength(100, { message: 'Area must be at most 100 characters long.' })
    area?: string;

    @IsEnum(ControllerNames)
    controller?: ControllerNames;

    @IsEnum(
        [...Object.values(CommonHandlers), ...Object.values(SpecificHandlers)],
        {
            message: 'Action must be a valid action.',
        },
    )
    action: CommonHandlers | SpecificHandlers;
}
