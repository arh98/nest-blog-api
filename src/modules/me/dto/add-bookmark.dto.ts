import { IsNumber, IsEnum } from 'class-validator';
import { BookmarkType } from '../enums/bookmark-type.enum';

export class AddBookmarkDto {
    @IsNumber()
    postId: number;

    @IsEnum(BookmarkType)
    type: BookmarkType;
}
