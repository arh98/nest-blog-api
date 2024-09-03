import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Permission } from './entities/permission.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { RolesModule } from '../roles/roles.module';

@Module({
    controllers: [PermissionsController],
    providers: [PermissionsService],
    imports: [
        TypeOrmModule.forFeature([Permission]),
        forwardRef(() => AuthModule),
        forwardRef(() => RolesModule)
    ],
    exports: [PermissionsService],
})
export class PermissionsModule {}
