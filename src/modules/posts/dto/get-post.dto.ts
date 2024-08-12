import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

class GetPostsBaseDto {
    @IsDate()
    @IsOptional()
    startDate?: Date;

    @IsDate()
    @IsOptional()
    endDate?: Date;
}

export class GetPostsDto extends IntersectionType(
    GetPostsBaseDto,
    PaginationQueryDto,
) {}
