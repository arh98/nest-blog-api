import {
    ConflictException,
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
    RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { SignUpDto } from 'src/modules/auth/authentication/dto/sign-up.dto';
import { HashingService } from 'src/modules/auth/hashing/hash.service';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateMultipleUsersDto } from '../dto/create-multiple-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { CreateMultipleUsersService } from './create-multiple-users.service';

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
        private readonly createMultipleUsersSerice: CreateMultipleUsersService,
        @Inject(forwardRef(() => HashingService))
        private readonly hasher: HashingService,
    ) {}

    /**
     * Creates a new user.
     */
    async create(dto: SignUpDto | CreateUserDto) {
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
                this.usersRepo.create({
                    ...dto,
                    password: await this.hasher.hash(dto.password),
                }),
            );
            return newUser;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new RequestTimeoutException('Unable to save user');
        }
    }

    /**
     * Fetches a list of users based on the provided pagination query.
     */
    async findAll(dto: PaginationQueryDto) {
        try {
            const users = await this.usersRepo.find({
                skip: dto.page,
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

    async findOneBy(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
        let user = null;
        try {
            user = await this.usersRepo.findOneBy(where);
        } catch (error) {
            throw new RequestTimeoutException('Could not fetch the user');
        }
        return user;
    }

    async deActive(id: number) {
        const user = await this.findOne(id);
        user.active = false;
        this.usersRepo.save(user).catch((err) => {
            console.error(err.message);
            throw new RequestTimeoutException('Unable to save the changes');
        });
    }

    async updatePassword(userId: number, newPasswd: string) {
        const user = await this.findOne(userId);
        try {
            const newPassHash = await this.hasher.hash(newPasswd);
            user.password = newPassHash;
            user.passwordChangedAt = new Date(Date.now());
            await this.usersRepo.save(user);
        } catch (error) {
            throw new Error(
                'Failed to update password. Please try again later.',
            );
        }
    }
    /**
     * Updates an existing user.
     */
    async update(id: number, dto: UpdateUserDto) {
        try {
            const existingUser = await this.findOne(id);

            this.mapDtoToUser(existingUser, dto);

            return await this.usersRepo.save(existingUser);
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

    async createMultiple(usersDto: CreateMultipleUsersDto) {
        return await this.createMultipleUsersSerice.createMany(usersDto);
    }

    async saveChanges(user: User) {
        return await this.usersRepo.save(user);
    }

    private mapDtoToUser(user: User, dto: UpdateUserDto): User {
        if (dto.email && dto.email !== user.email) {
            if (user.emailConfirmed) {
                user.emailConfirmed = false;
            }
        }
        user.firstName = dto.firstName ?? user.firstName;
        user.lastName = dto.lastName ?? user.lastName;
        user.email = dto.email ?? user.email;
        user.bio = dto.bio ?? user.bio;
        return user;
    }
}
