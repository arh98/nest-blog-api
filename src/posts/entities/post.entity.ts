import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';
import { User } from 'src/users/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 512,
    })
    title: string;

    @Column({
        type: 'enum',
        enum: PostType,
        default: PostType.POST,
    })
    postType: PostType;

    @Column({
        type: 'varchar',
        length: 256,
        unique: true,
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: PostStatus,
        default: PostStatus.DRAFT,
    })
    status: PostStatus;

    @Column({
        type: 'text',
        nullable: true,
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp', // 'datetime' in mysql
        nullable: true,
    })
    publishOn?: Date;

    @ManyToMany(() => Tag, (tag) => tag.posts)
    @JoinTable()
    tags?: Tag[];

    @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
        cascade: true,
        eager: true,
    })
    metaOptions?: MetaOption;

    @ManyToOne(() => User, (user) => user.posts, {
        eager: true,
    })
    author: User;
}
