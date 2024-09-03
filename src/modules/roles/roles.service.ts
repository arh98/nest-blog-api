import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { PermissionsService } from '../permissions/permissions.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepo: Repository<Role>,
        private readonly permissionsService: PermissionsService,
    ) {}

    async findAll() {
        return this.roleRepo.find({ relations: ['permissions'] });
    }

    async findOne(id: number) {
        const role = await this.roleRepo.findOne({
            where: { id },
            relations: ['permissions'],
        });
        if (!role) {
            throw new NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }

    async create(dto: CreateRoleDto) {
        const nameIsTaken = await this.isRoleNameTaken(dto.name);
        if (nameIsTaken) {
            throw new UnprocessableEntityException(
                `The name "${dto.name}" is already taken for an existing role!`,
            );
        }
        const permissions = await this.getPermissionByIds(dto.permissions);
        try {
            return this.roleRepo.save(
                this.roleRepo.create({
                    ...dto,
                    permissions,
                }),
            );
        } catch (err) {
            throw new BadRequestException('Unable to save role in db');
        }
    }

    async update(id: number, dto: UpdateRoleDto) {
        try {
            const role = await this.findOne(id);
            if (dto.name !== undefined) {
                const isTaken = await this.isRoleNameTaken(dto.name, id);
                if (isTaken) {
                    throw new UnprocessableEntityException(
                        'Already taken this name for a existing role!',
                    );
                }
            }

            this.mapDtoToRole(role, dto);

            const permissions = await this.getPermissionByIds(dto.permissions);
            role.permissions = permissions;

            return await this.roleRepo.save(role);
        } catch (error) {
            if (
                error instanceof NotFoundException ||
                UnprocessableEntityException
            ) {
                throw error;
            }
            // console.error('Error updating role:', error);
            throw new BadRequestException('Error updating role');
        }
    }

    async remove(id: number) {
        const role = await this.findOne(id);

        this.roleRepo.delete(role.id).catch((err) => {
            throw new BadRequestException('Unable to delete role!');
        });
    }

    private mapDtoToRole(role: Role, dto: UpdateRoleDto) {
        role.name = dto.name ?? role.name;
        role.description = dto.description ?? role.description;
        return role;
    }

    private async isRoleNameTaken(name: string, excludeId?: number) {
        const condition = excludeId ? { name, id: Not(excludeId) } : { name };
        const count = await this.roleRepo.count({
            where: condition,
        });
        return count > 0;
    }

    private async getPermissionByIds(ids: number[]) {
        return ids && ids.length > 0
            ? await this.permissionsService.whereInIds(ids)
            : [];
    }
}
