import { EntityBase } from 'src/common/entities/base.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { FileType } from '../enums/file-type.enum';

@Entity()
export class Upload extends EntityBase {
    @Column({
        type: 'varchar',
        length: 1024,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 1024,
    })
    path: string;

    @Column({
        type: 'enum',
        enum: FileType,
        default: FileType.IMAGE,
    })
    type: string;

    @Column({
        type: 'varchar',
        length: 128,
    })
    mime: string;

    @Column({
        type: 'varchar',
        length: 1024,
    })
    size: number;

    @ManyToOne(() => Post)
    post: Post;
}
