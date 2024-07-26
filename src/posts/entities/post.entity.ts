import { MetaOption } from 'src/meta-options/entities/meta-option.entity';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from '../enums/post-status.enum';
import { PostType } from '../enums/post-type.enum';

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

    tags?: string[];

    @OneToOne(() => MetaOption, (metaOptions) => metaOptions.post, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    metaOptions?: MetaOption;
}
