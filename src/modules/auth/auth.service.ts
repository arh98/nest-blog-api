import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
    ) {}
}
