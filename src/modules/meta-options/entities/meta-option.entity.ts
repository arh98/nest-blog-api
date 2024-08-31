import { EntityBase } from 'src/common/entities/base.entity';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class MetaOption extends EntityBase {
    @Column({
        type: 'json',
    })
    metaValue: string;

    @OneToOne(() => Post, (post) => post.metaOptions, {
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    post: Post;
}
