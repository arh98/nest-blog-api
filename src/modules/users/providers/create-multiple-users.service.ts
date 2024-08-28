import {
    ConflictException,
    Injectable,
    RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateMultipleUsersDto } from '../dto/create-multiple-user.dto';
import { User } from '../entities/user.entity';
import { HashingService } from 'src/modules/auth/hashing/hash.service';

@Injectable()
export class CreateMultipleUsersService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly hasher: HashingService,
    ) {}

    async createMany(createManyUsersDto: CreateMultipleUsersDto) {
        const newUsers: User[] = [];

        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
        } catch (error) {
            throw new RequestTimeoutException(
                'Could not connect to the database',
            );
        }

        try {
            for (const user of createManyUsersDto.users) {
                const newUser = queryRunner.manager.create(User, user);
                newUser.password = await this.hasher.hash(user.password);
                const result = await queryRunner.manager.save(newUser);
                newUsers.push(result);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new ConflictException('Could not complete the transaction', {
                description: String(error),
            });
        } finally {
            try {
                await queryRunner.release();
            } catch (error) {
                throw new RequestTimeoutException(
                    'Could not release the query runner connection',
                );
            }
        }

        return newUsers;
    }
}
