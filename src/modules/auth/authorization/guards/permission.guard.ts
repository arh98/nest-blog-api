import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/roles/entities/role.entity';
import { RolesService } from 'src/modules/roles/roles.service';
import { AuthType } from '../../authentication/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from '../../decorators/auth-type.decorator';
import { UNRESTRICTED_KEY } from '../decorators/unrestricted-access.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private readonly roleService: RolesService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const controller = context.getClass();
        const handler = context.getHandler();

        const controllerName = controller.name;
        const handlerName = handler.name;

        const authType = this.reflector.get<AuthType[]>(AUTH_TYPE_KEY, handler);
        const isPublic = this.reflector.get<boolean>(UNRESTRICTED_KEY, handler);

        if (
            Array.isArray(authType) &&
            (authType[0] === AuthType.None || isPublic)
        ) {
            return true;
        }

        if (!req.user) {
            throw new UnauthorizedException('User not authenticated');
        }

        const role = await this.roleService.findOne(req.user.roleId);
        if (!role) {
            throw new ForbiddenException('Role not found');
        }
        
        const hasPermission = this.checkPermissions(
            role,
            controllerName,
            handlerName,
        );

        if (!hasPermission) {
            throw new ForbiddenException(
                'You do not have permission to perform this action',
            );
        }

        return true;
    }

    private checkPermissions(role: Role, controller: string, handler: string) {
        if (!role.permissions) {
            return false;
        }
        return role.permissions.some(
            (permission) =>
                permission.controller === controller &&
                permission.action === handler,
        );
    }
}
