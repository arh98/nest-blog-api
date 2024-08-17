import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Bookmark } from '../../me/entities/bookmark.entity';
import { Follow } from '../../me/entities/follow.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 96,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 96,
    })
    lastName: string;

    @Column({ nullable: true })
    bio: string;

    @Column({
        type: 'varchar',
        length: 96,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
    })
    password: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.author)
    comments: Comment[];

    @OneToMany(() => Bookmark, (bookmark) => bookmark.user)
    bookmarks: Bookmark[];

    @OneToMany(() => Follow, (follow) => follow.follower)
    followers: Follow[];

    @OneToMany(() => Follow, (follow) => follow.following)
    following: Follow[];
}
