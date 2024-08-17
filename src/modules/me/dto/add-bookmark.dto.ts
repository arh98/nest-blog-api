import { IsNumber, IsEnum } from 'class-validator';
import { BookmarkType } from '../enums/bookmark-type.enum';

export class AddBookmarkDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    postId: number;

    @IsEnum(BookmarkType)
    type: BookmarkType;
}
