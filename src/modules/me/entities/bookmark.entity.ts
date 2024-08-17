import { Post } from 'src/modules/posts/entities/post.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { BookmarkType } from '../enums/bookmark-type.enum';

@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: BookmarkType;

    @ManyToOne(() => User, (user) => user.bookmarks)
    user: User;

    @ManyToOne(() => Post)
    post: Post;
}
