import { applyDecorators, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export function getUsersDecorators() {
    return applyDecorators(
        ApiOperation({
            summary: 'Fetches a list of users ',
            description:
                'Fetches a list of registered users on the application.',
        }),
        ApiResponse({
            status: 200,
            description: 'Users fetched successfully based on the query',
        }),
        Get(),
    );
}

export function getUserDecorators() {
    return applyDecorators(
        ApiOperation({
            summary: 'Fetches a user by id ',
            description: 'Fetches a registered user by id on the application.',
        }),
        ApiResponse({
            status: 200,
            description: 'User fetched successfully based on the query',
        }),
        ApiResponse({
            status: 404,
            description: 'The user with the specified ID was not found.',
        }),
        Get(':id'),
    );
}

export function postUserDecorators() {
    return applyDecorators(
        Post(),
        ApiOperation({
            summary: 'Create a new user',
            description: 'This endpoint creates a new user in the system.',
        }),
        ApiResponse({
            status: 201,
            description: 'The user has been created successfully.',
            type: CreateUserDto,
        }),
        ApiResponse({
            status: 400,
            description: 'Bad request. The provided data is invalid.',
        }),
    );
}

export function patchUserDecorators() {
    return applyDecorators(
        Patch(':id'),
        ApiOperation({
            summary: 'Update an existing user',
            description:
                'This endpoint updates an existing user in the system.',
        }),
        ApiParam({
            name: 'id',
            description: 'The ID of the user to update',
            example: '123456',
        }),
        ApiBody({
            description: 'The updated user data,',
            type: UpdateUserDto,
        }),
        ApiResponse({
            status: 200,
            description: 'The user has been updated successfully.',
            type: UpdateUserDto,
        }),
        ApiResponse({
            status: 400,
            description: 'Bad request. The provided data is invalid.',
        }),
        ApiResponse({
            status: 404,
            description: 'The user with the specified ID was not found.',
        }),
    );
}

export function deleteUserDecorators() {
    return applyDecorators(
        // HttpCode(HttpStatus.NO_CONTENT),
        Delete(':id'),
        ApiOperation({
            summary: 'Delete a user',
            description:
                'This endpoint deletes an existing user from the system.',
        }),
        ApiParam({
            name: 'id',
            description: 'The ID of the user to delete',
            example: '123456',
        }),
        ApiResponse({
            status: 200,
            description: 'The user has been deleted successfully.',
        }),
        ApiResponse({
            status: 404,
            description: 'The user with the specified ID was not found.',
        }),
    );
}
