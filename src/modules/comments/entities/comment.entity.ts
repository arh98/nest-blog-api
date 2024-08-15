import { Post } from 'src/modules/posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.comments)
    author: User;

    @ManyToOne(() => Post, (post) => post.comments)
    post: Post;
}
