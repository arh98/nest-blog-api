import {
    ConflictException,
    Injectable,
    RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dto/create-many-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateManyUsersService {
    constructor(private readonly dataSource: DataSource) {}

    async createMany(createManyUsersDto: CreateManyUsersDto) {
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
