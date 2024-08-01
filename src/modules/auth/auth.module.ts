import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
    imports: [forwardRef(() => UsersModule)],
})
export class AuthModule {}
