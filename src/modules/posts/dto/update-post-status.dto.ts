import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { PostStatus } from '../enums/post-status.enum';

export class UpdatePostStatusDto {
    @ApiProperty({
        description: 'The status of the post',
        enum: PostStatus,
        example: PostStatus.DRAFT,
    })
    @IsEnum(PostStatus)
    @IsNotEmpty()
    readonly status: PostStatus;
}
