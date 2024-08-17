import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';
import { User } from '../../users/entities/user.entity';
import { UsersService } from 'src/modules/users/providers/users.service';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(Follow)
        private readonly followRepo: Repository<Follow>,
        private readonly userService: UsersService,
    ) {}

    async follow(userId: number, followUserId: number) {
        const follow = this.followRepo.create();
        follow.follower = await this.userService.findOne(userId);
        follow.following = await this.userService.findOne(followUserId);
        await this.followRepo.save(follow);
        return { status: 'success', message: 'followed successfully' };

    }

    async unfollow(userId: number, followUserId: number) {
        const record = await this.followRepo.findOne({
            where: {
                follower: { id: userId },
                following: { id: followUserId },
            },
        });
        if (!record) {
            throw new BadRequestException("You didn't follow this user");
        }
        await this.followRepo.remove(record);
        return { status: 'success', message: 'Unfollowed successfully' };
    }

    async getFollowers(userId: number): Promise<User[]> {
        const followers = await this.followRepo.find({
            where: {
                following: { id: userId },
            },
            relations: ['follower'],
        });
        return followers.map((follow) => follow.follower);
    }

    async getFollowing(userId: number): Promise<User[]> {
        const following = await this.followRepo.find({
            where: {
                follower: { id: userId },
            },
            relations: ['following'],
        });
        return following.map((follow) => follow.following);
    }
}
