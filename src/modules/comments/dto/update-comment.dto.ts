import { PartialType } from '@nestjs/swagger';
import { CreateCommentDto } from './create-comment.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
    @IsOptional()
    @IsBoolean()
    approved: boolean;
}
