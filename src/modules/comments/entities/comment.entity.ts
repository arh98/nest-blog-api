import { EntityBase } from 'src/common/entities/base.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('comments')
export class Comment extends EntityBase {
    @Column('text')
    content: string;

    @Column({ default: false })
    approved: boolean;

    @Column({ default: false })
    edited: boolean;

    @Column({ default: false })
    reported: boolean;

    @Column({ nullable: true })
    replyToId: number;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: 0 })
    dislikes: number;

    @ManyToOne(() => User, (user) => user.comments)
    author: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;
}
