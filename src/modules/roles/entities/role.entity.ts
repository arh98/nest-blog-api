import { EntityBase } from 'src/common/entities/base.entity';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Role extends EntityBase {
    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    description: string;

    @ManyToMany(() => Permission, (permission) => permission.roles)
    permissions: Permission[];
}
