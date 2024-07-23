import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostType } from '../enums/post-type.enum';
import { PostStatus } from '../enums/post-status.enum';
import { CreateMetaOptionDto } from '../dto/create-meta-option.dto';

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
    metaOptions?: CreateMetaOptionDto[];
}
