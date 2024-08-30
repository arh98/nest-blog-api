import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { FileType } from '../enums/file-type.enum';
import { Post } from 'src/modules/posts/entities/post.entity';

@Entity()
export class Upload {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
