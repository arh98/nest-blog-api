import { Post } from 'src/modules/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 96,
    })
    firstName: string;

    @Column({
        type: 'varchar',
        length: 96,
    })
    lastName: string;

    @Column({
        type: 'varchar',
        length: 96,
        unique: true,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 96,
    })
    password: string;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
}
