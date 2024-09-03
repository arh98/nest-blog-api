import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
    PermissionConfiguration,
    PermissionPayload,
} from './config/permission.config';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepo: Repository<Permission>,
    ) {}

    async findOne(id: number) {
        const permission = await this.permissionRepo.findOneBy({ id });
        if (!permission) {
            throw new NotFoundException(`Permission with ID ${id} not found`);
        }
        return permission;
    }

    async findAll() {
        return await this.permissionRepo.find();
    }

    async create(dto: CreatePermissionDto) {
        try {
            return await this.permissionRepo.save(
                this.permissionRepo.create(dto),
            );
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException(
                    'Permission with this name already exists',
                );
            }
            throw new BadRequestException('Failed to create permission');
        }
    }

    async update(id: number, dto: UpdatePermissionDto) {
        const permission = await this.findOne(id);
        if (!permission) {
            throw new NotFoundException('Permission not found');
        }

        const condition = {
            name: dto.name,
            id: Not(id),
        };
        const countSameName = await this.permissionRepo.count({
            where: condition,
        });

        if (countSameName > 0) {
            throw new UnprocessableEntityException(
                'Already taken this permission name',
            );
        }

        this.mapDtoToPermission(permission, dto);
        return this.permissionRepo.save(permission);
    }

    async remove(id: number) {
        const permission = await this.findOne(id);
        try {
            await this.permissionRepo.delete(permission.id);
        } catch (error) {
            throw new BadRequestException('Failed to remove permission');
        }
    }

    async whereInIds(ids: number[]) {
        if (!ids || ids.length === 0) {
            return [];
        }

        const permissions = await this.permissionRepo.find({
            where: {
                id: In(ids),
            },
        });

        if (permissions.length !== ids.length) {
            throw new NotFoundException('Some permissions not found');
        }

        return permissions;
    }

    async syncPermissions() {
        const permissionsList: PermissionPayload[] =
            PermissionConfiguration.permissions;

        for (const permissionData of permissionsList) {
            const existingPermission = await this.permissionRepo.findOne({
                where: { name: permissionData.name },
            });

            if (!existingPermission) {
                const newPermission =
                    this.createPermissionEntity(permissionData);
                await this.permissionRepo.save(newPermission);
            } else {
                this.updatePermissionEntity(existingPermission, permissionData);
                await this.permissionRepo.save(existingPermission);
            }
        }
        return { message: 'Synced permissions successfully.' };
    }

    private createPermissionEntity(permissionData: PermissionPayload) {
        const permission = new Permission();
        permission.name = permissionData.name;
        permission.description = permissionData.description;
        permission.area = permissionData.area;
        permission.controller = permissionData.controller;
        permission.action = permissionData.action;
        return permission;
    }

    private updatePermissionEntity(
        existingPermission: Permission,
        permissionData: PermissionPayload,
    ) {
        existingPermission.description =
            permissionData.description ?? existingPermission.description;
        existingPermission.area =
            permissionData.area ?? existingPermission.area;
        existingPermission.controller =
            permissionData.controller ?? existingPermission.controller;
        existingPermission.action =
            permissionData.action ?? existingPermission.action;
    }

    private mapDtoToPermission(
        permission: Permission,
        dto: UpdatePermissionDto,
    ) {
        permission.name = dto.name ?? permission.name;
        permission.description = dto.description ?? permission.description;
        permission.area = dto.area ?? permission.area;
        permission.controller = dto.controller ?? permission.controller;
        permission.action = dto.action ?? permission.action;

        return permission;
    }
}
