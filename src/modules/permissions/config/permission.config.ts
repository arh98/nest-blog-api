import { CommonHandlers, SpecificHandlers } from '../enums/handler-names.enum';
import { ControllerNames } from '../enums/controller-names.enum';

interface RolePayload {
    id: number;
    name: string;
    description: string;
}

export interface PermissionConfigInterface {
    roles: Array<RolePayload>;
    permissions: Array<PermissionPayload>;
}

export interface PermissionPayload {
    name: string;
    description: string;
    area?: string;
    controller?: string;
    action?: CommonHandlers | SpecificHandlers;
}

export const PermissionConfiguration: PermissionConfigInterface = {
    roles: [
        {
            id: 1,
            name: 'superuser',
            description: 'Superuser of the system',
        },
        {
            id: 2,
            name: 'normal',
            description: 'Normal user of the system',
        },
    ],
    permissions: [
        // UsersController Permissions
        {
            name: 'View all users',
            description: 'Permission to view all users',
            area: 'User Management',
            controller: ControllerNames.UsersController,
            action: CommonHandlers.FindAll,
        },
        {
            name: 'View a user',
            description: 'Permission to view a user',
            area: 'User Management',
            controller: ControllerNames.UsersController,
            action: CommonHandlers.FindOne,
        },
        {
            name: 'Create user',
            description: 'Permission to create a new user',
            area: 'User Management',
            controller: ControllerNames.UsersController,
            action: CommonHandlers.Create,
        },
        {
            name: 'Update user',
            description: 'Permission to update user details',
            area: 'User Management',
            controller: ControllerNames.UsersController,
            action: CommonHandlers.Update,
        },
        {
            name: 'Delete user',
            description: 'Permission to delete a user',
            area: 'User Management',
            controller: ControllerNames.UsersController,
            action: CommonHandlers.Remove,
        },
        {
            name: 'create multiple users',
            description: 'Permission to create multiple users',
            area: 'User Management',
            controller: ControllerNames.UsersController,
            action: SpecificHandlers.CreateMultipleUsers,
        },
        // PostsController Permissions
        {
            name: 'update post status',
            description: 'Permission to update post status',
            area: 'Post Management',
            controller: ControllerNames.PostsController,
            action: SpecificHandlers.UpdatePostStatus,
        },
        {
            name: 'fetch unpublished posts',
            description: 'Permission to fetch unpublished posts',
            area: 'Post Management',
            controller: ControllerNames.PostsController,
            action: SpecificHandlers.FindUnpublished,
        },
        // CommentsController Permissions
        {
            name: 'View all comments',
            description: 'Permission to view all comments',
            area: 'Comment Management',
            controller: ControllerNames.CommentsController,
            action: CommonHandlers.FindAll,
        },
        {
            name: 'View a comment',
            description: 'Permission to view a comment',
            area: 'Comment Management',
            controller: ControllerNames.CommentsController,
            action: CommonHandlers.FindOne,
        },
        {
            name: 'approve multiple or one comment',
            description: 'Permission to update a comment approve status',
            area: 'Comment Management',
            controller: ControllerNames.CommentsController,
            action: SpecificHandlers.ApproveMultiple,
        },
        {
            name: 'Delete comment',
            description: 'Permission to delete a comment',
            area: 'Comment Management',
            controller: ControllerNames.CommentsController,
            action: CommonHandlers.Remove,
        },

        // RolesController Permissions
        {
            name: 'View all roles',
            description: 'Permission to view all roles',
            area: 'Role Management',
            controller: ControllerNames.RolesController,
            action: CommonHandlers.FindAll,
        },
        {
            name: 'Find role',
            description: 'Permission to get a role',
            area: 'Role Management',
            controller: ControllerNames.RolesController,
            action: CommonHandlers.FindOne,
        },
        {
            name: 'Create role',
            description: 'Permission to create a new role',
            area: 'Role Management',
            controller: ControllerNames.RolesController,
            action: CommonHandlers.Create,
        },
        {
            name: 'Update role',
            description: 'Permission to update a role',
            area: 'Role Management',
            controller: ControllerNames.RolesController,
            action: CommonHandlers.Update,
        },
        {
            name: 'Delete role',
            description: 'Permission to delete a role',
            area: 'Role Management',
            controller: ControllerNames.RolesController,
            action: CommonHandlers.Remove,
        },

        // PermissionsController Permissions
        {
            name: 'View all permissions',
            description: 'Permission to view all permissions',
            area: 'Permission Management',
            controller: ControllerNames.PermissionsController,
            action: CommonHandlers.FindAll,
        },
        {
            name: 'View a permissions',
            description: 'Permission to view a permissions',
            area: 'Permission Management',
            controller: ControllerNames.PermissionsController,
            action: CommonHandlers.FindOne,
        },
        {
            name: 'Create a permissions',
            description: 'Permission to create a permissions',
            area: 'Permission Management',
            controller: ControllerNames.PermissionsController,
            action: CommonHandlers.Create,
        },
        {
            name: 'Sync permissions',
            description: 'Permission to sync permissions from configuration',
            area: 'Permission Management',
            controller: ControllerNames.PermissionsController,
            action: SpecificHandlers.Sync,
        },
        {
            name: 'Update permission',
            description: 'Permission to update a permission',
            area: 'Permission Management',
            controller: ControllerNames.PermissionsController,
            action: CommonHandlers.Update,
        },
        {
            name: 'Delete permission',
            description: 'Permission to delete a permission',
            area: 'Permission Management',
            controller: ControllerNames.PermissionsController,
            action: CommonHandlers.Remove,
        },
    ],
};
