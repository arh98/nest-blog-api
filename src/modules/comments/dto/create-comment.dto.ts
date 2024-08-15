import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty()
    @IsInt()
    readonly postId: number;

    @ApiProperty()
    @IsString()
    readonly content: string;

    @ApiProperty({ nullable: true })
    @IsOptional()
    @IsInt()
    readonly replyToId?: number;
}
