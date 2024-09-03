import { forwardRef, Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        TypeOrmModule.forFeature([Role]),
        forwardRef(() => PermissionsModule),
    ],
    exports: [RolesService],
})
export class RolesModule {}
