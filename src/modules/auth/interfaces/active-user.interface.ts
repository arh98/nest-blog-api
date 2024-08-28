// import { Role } from 'src/users/enums/user-role.enum';
// import { PermissionType } from '../authorization/permission.type';

export interface IActiveUser {
    // user id
    sub: number;

    email: string;

    // role: Role;

    // permissions: PermissionType[];
}
