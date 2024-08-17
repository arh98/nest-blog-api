import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Follow {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.followers)
    follower: User;

    @ManyToOne(() => User, (user) => user.following)
    following: User;

    @CreateDateColumn()
    createdAt: Date;
}
