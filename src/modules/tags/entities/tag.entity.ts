import { EntityBase } from 'src/common/entities/base.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, DeleteDateColumn, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends EntityBase {
    @Column({
        type: 'varchar',
        length: 256,
        unique: true,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 512,
        unique: true,
    })
    slug: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    description: string;

    @Column({
        type: 'text',
        nullable: true,
    })
    schema: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true,
    })
    featuredImage: string;

    // enables soft delete
    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => Post, (post) => post.tags, { onDelete: 'CASCADE' })
    posts: Post[];
}
