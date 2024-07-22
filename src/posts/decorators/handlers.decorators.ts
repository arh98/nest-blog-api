import { applyDecorators, Post, Get, Patch, Delete } from '@nestjs/common';
import {
    ApiOperation,
    ApiCreatedResponse,
    ApiBody,
    ApiOkResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export function createPostDecorators() {
    return applyDecorators(
        ApiOperation({
            summary: 'Create a new post',
            description: 'Creates a new post in the application.',
        }),
        ApiCreatedResponse({
            description: 'The post has been created successfully.',
            type: CreatePostDto,
        }),
        ApiBody({
            description: 'The post data to create.',
            type: CreatePostDto,
        }),
        Post(),
    );
}

export function getPostsDecorators() {
    return applyDecorators(
        ApiOperation({
            summary: 'Fetch all posts',
            description: 'Fetches a list of all posts in the application.',
        }),
        ApiOkResponse({
            description: 'Posts fetched successfully.',
            type: [Post],
        }),
        Get(),
    );
}

export function getPostDecorators() {
    return applyDecorators(
        ApiOperation({
            summary: 'Fetch a post by ID',
            description: 'Fetches a post by its ID in the application.',
        }),
        ApiOkResponse({
            description: 'Post fetched successfully.',
            type: Post,
        }),
        ApiNotFoundResponse({
            description: 'The post with the specified ID was not found.',
        }),
        Get(':id'),
    );
}

export function patchPostDecorators() {
    return applyDecorators(
        ApiOperation({
            summary: 'Update a post',
            description: 'Updates an existing post in the application.',
        }),
        ApiOkResponse({
            description: 'The post has been updated successfully.',
            type: Post,
        }),
        ApiNotFoundResponse({
            description: 'The post with the specified ID was not found.',
        }),
        ApiBody({
            description: 'The updated post data.',
            type: UpdatePostDto,
        }),
        Patch(':id'),
    );
}

export function deletePostDecorators() {
    return applyDecorators(
        ApiOperation({
            summary: 'Delete a post',
            description: 'Deletes an existing post from the application.',
        }),
        ApiOkResponse({
            description: 'The post has been deleted successfully.',
        }),
        ApiNotFoundResponse({
            description: 'The post with the specified ID was not found.',
        }),
        Delete(':id'),
    );
}
