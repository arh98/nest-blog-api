import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from './entities/user.entity';
import { CreateManyUsersService } from './providers/create-many-users.service';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController],
    providers: [UsersService, CreateManyUsersService],
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
    exports: [UsersService],
})
export class UsersModule {}
