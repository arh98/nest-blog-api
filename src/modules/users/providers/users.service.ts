import {
    ConflictException,
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateManyUsersDto } from '../dto/create-many-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { CreateManyUsersService } from './create-many-users.service';

/**
 * Service for managing user-related operations.
 */
@Injectable()
export class UsersService {
    /**
     * Constructs a new instance of the UsersService.
     */
    constructor(
        @InjectRepository(User)
        private readonly usersRepo: Repository<User>,
        private readonly createManyUsersSerice: CreateManyUsersService,
    ) {}

    /**
     * Creates a new user.
     */
    async create(dto: CreateUserDto) {
        try {
            const existingUser = await this.usersRepo.findOne({
                where: { email: dto.email },
            });

            if (existingUser) {
                throw new ConflictException(
                    'User with this email already exists',
                );
            }

            const newUser = await this.usersRepo.save(
                this.usersRepo.create(dto),
            );
            return newUser;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new RequestTimeoutException('Error saving user');
        }
    }

    /**
     * Fetches a list of users based on the provided pagination query.
     */
    async findAll(dto: PaginationQueryDto) {
        try {
            const users = await this.usersRepo.find({
                skip: dto.offset,
                take: dto.limit,
            });
            return users;
        } catch (error) {
            console.error('Error retrieving users:', error);
            throw new RequestTimeoutException('Error retrieving users');
        }
    }

    /**
     * Fetches a user by their ID.
     */
    async findOne(id: number) {
        const user = await this.usersRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    /**
     * Updates an existing user.
     */
    async update(id: number, dto: UpdateUserDto) {
        try {
            const existingUser = await this.findOne(id);

            const updatedUser = await this.usersRepo.save({
                ...existingUser,
                ...dto,
            });

            return updatedUser;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error updating user:', error);
            throw new RequestTimeoutException('Error updating user');
        }
    }

    /**
     * Removes a user by their ID.
     */
    async remove(id: number) {
        try {
            const existingUser = await this.findOne(id);
            await this.usersRepo.remove(existingUser);
            return { message: `User with ID ${id} has been removed` };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error removing user:', error);
            throw new RequestTimeoutException('Error removing user');
        }
    }

    async createMany(usersDto: CreateManyUsersDto) {
        return await this.createManyUsersSerice.createMany(usersDto);
    }
}
