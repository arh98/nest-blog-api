import { Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
// import { AuthModule } from 'src/modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateManyUsersService } from './providers/create-many-users.service';

@Module({
    controllers: [UsersController],
    providers: [UsersService, CreateManyUsersService],
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UsersService],
})
export class UsersModule {}
