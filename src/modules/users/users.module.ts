import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { CreateMultipleUsersService } from './providers/create-multiple-users.service';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController],
    providers: [UsersService, CreateMultipleUsersService],
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    exports: [UsersService],
})
export class UsersModule {}
