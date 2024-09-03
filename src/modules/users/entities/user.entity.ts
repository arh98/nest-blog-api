import { Exclude } from 'class-transformer';
import { EntityBase } from 'src/common/entities/base.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import {
    BeforeInsert,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Bookmark } from '../../me/entities/bookmark.entity';
import { Follow } from '../../me/entities/follow.entity';

@Entity()
export class User extends EntityBase {
    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    lastName: string;

    @Column({ nullable: true })
    bio: string;

    @Column({
        type: 'boolean',
        default: true,
    })
    active: boolean;

    @Column({
        type: 'boolean',
        default: false,
    })
    emailConfirmed: boolean;

    @Column({
        type: 'varchar',
        length: 96,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
        nullable: true,
    })
    @Exclude()
    password?: string;

    @Column({ type: 'timestamp', nullable: true })
    @Exclude()
    resetTokenValidityDate: Date;

    @Column({ type: 'timestamp', nullable: true })
    @Exclude()
    passwordChangedAt: Date;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 96,
    })
    @Exclude()
    googleId?: string;

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

    @ManyToOne(() => Role)
    @JoinColumn()
    role: Role;

    @BeforeInsert()
    setDefaultRole() {
        this.role = { id: 5 } as Role;
    }
}
