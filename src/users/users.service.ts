import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

/**
 * Service for managing user-related operations.
 */
@Injectable()
export class UsersService {
    /**
     * Constructs a new instance of the UsersService.
     */
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ) {}

    /**
     * Creates a new user.
     */
    create(dto: CreateUserDto): string {
        return 'This action adds a new user';
    }

    /**
     * Fetches a list of users based on the provided pagination query.
     */
    findAll(dto: PaginationQueryDto) {
        return `This action returns all users`;
    }

    /**
     * Fetches a user by their ID.
     */
    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    /**
     * Updates an existing user.
     */
    update(id: number, dto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    /**
     * Removes a user by their ID.
     */
    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
