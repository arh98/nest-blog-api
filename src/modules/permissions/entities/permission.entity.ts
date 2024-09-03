import { EntityBase } from 'src/common/entities/base.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Permission extends EntityBase {
    @Column({ unique: true })
    name: string;

    @Column()
    description: string;

    @Column({ nullable: true })
    area: string;

    @Column({ nullable: true })
    controller: string;

    @Column({ nullable: true })
    action: string;

    @ManyToMany(() => Role, (role) => role.permissions)
    @JoinTable()
    roles: Role[];
}
