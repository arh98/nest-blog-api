# NestJS API with PostgreSQL and Redis

This is a Blog-Post RESTful API built with NestJS,TypeORM, utilizing PostgreSQL as the database. The API supports user authentication, role-based access control, and various CRUD operations.

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Controllers](#controllers)
    -   [Posts Controller](#posts-controller)
    -   [Tags Controller](#tags-controller)
    -   [Comments Controller](#comments-controller)
    -   [Uploads Controller](#uploads-controller)
    -   [Meta Options Controller](#meta-options-controller)
    -   [Me Controller](#me-controller)
    -   [Users Controller](#users-controller)
    -   [Roles Controller](#roles-controller)
    -   [Permissions Controller](#permissions-controller)
-   [License](#license)

## Features

-   Modular architecture for easy scalability
-   User authentication (sign up, sign in, password reset)
-   Email confirmation
-   Role-based access control
-   Token-based authentication (JWT)
-   Refresh token validation mechanism using a Redis store
-   Helmet : protect from well-known web vulnerabilities by setting HTTP headers appropriately
-   Rate Limiting : A common technique to protect applications from brute-force attacks.
-   Encryption and Hashing user password using bcrypt

## Technologies

-   [NestJS](https://nestjs.com/)
-   [PostgreSQL](https://www.postgresql.org/)
-   [Redis](https://redis.io/)
-   [TypeORM](https://typeorm.io/)
-   [Jest](https://jestjs.io/) for testing

## Usage

Once the application is running, you can access the API at `http://localhost:3000`. Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to interact with the API endpoints.


## Controllers

### Posts Controller

-   **Create Post**: `POST /posts` - Create a new post.
-   **Find All Published Posts**: `GET /posts` - Retrieve all published posts.
-   **Find Unpublished Posts**: `GET /posts/unpublished` - Retrieve unpublished posts (requires permissions).
-   **Find One Post**: `GET /posts/:id` - Retrieve a specific post by ID.
-   **Update Post**: `PATCH /posts/:id` - Update a specific post by ID.
-   **Update Post Status**: `PATCH /posts/:id/status` - Update the status of a specific post (requires permissions).
-   **Delete Post**: `DELETE /posts/:id` - Delete a specific post by ID.

### Tags Controller

-   **Create Tag**: `POST /tags` - Create a new tag.
-   **Find All Tags**: `GET /tags` - Retrieve all tags.
-   **Find One Tag**: `GET /tags/:id` - Retrieve a specific tag by ID.
-   **Update Tag**: `PATCH /tags/:id` - Update a specific tag by ID.
-   **Delete Tag**: `DELETE /tags/:id` - Delete a specific tag by ID.

### Comments Controller

-   **Create Comment**: `POST /comments` - Create a new comment.
-   **Find All Comments**: `GET /comments` - Retrieve all comments.
-   **Find One Comment**: `GET /comments/:id` - Retrieve a specific comment by ID.
-   **Update Comment**: `PATCH /comments/:id` - Update a specific comment by ID.
-   **Delete Comment**: `DELETE /comments/:id` - Delete a specific comment by ID.
-   **Approve Multiple Comments**: `PUT /comments/approve` - Approve multiple comments.

### Uploads Controller

-   **Upload File**: `POST /uploads/file` - Upload a new image to the liara .

### Meta Options Controller

-   **Create Meta Option**: `POST /meta-options` - Create a new meta option.

### Me Controller

-   **Get My Profile**: `GET /me` - Retrieve the authenticated user's profile.
-   **Update My Profile**: `PATCH /me` - Update the authenticated user's profile.
-   **Delete My Profile**: `DELETE /me` - Delete the authenticated user's profile.
-   **Get Bookmarks or Favorites**: `GET /me/bookmarks` - Retrieve bookmarks or favorites.
-   **Add Bookmark**: `POST /me/bookmarks` - Add a new bookmark.
-   **Remove Bookmark**: `DELETE /me/bookmarks/:bookmarkId` - Remove a specific bookmark.
-   **Follow User**: `POST /me/follow/:userId` - Follow a user.
-   **Unfollow User**: `DELETE /me/unfollow/:userId` - Unfollow a user.
-   **Get Followers**: `GET /me/followers` - Retrieve followers of the authenticated user.
-   **Get Following**: `GET /me/following` - Retrieve users that the authenticated user is following.

### Users Controller

-   **Create User**: `POST /users` - Create a new user.
-   **Find All Users**: `GET /users` - Retrieve all users.
-   **Find One User**: `GET /users/:id` - Retrieve a specific user by ID.
-   **Update User**: `PATCH /users/:id` - Update a specific user by ID.
-   **Delete User**: `DELETE /users/:id` - Delete a specific user by ID.
-   **Create Multiple Users**: `POST /users/create-many` - Create multiple users.

### Roles Controller

-   **Create Role**: `POST /roles` - Create a new role.
-   **Find All Roles**: `GET /roles` - Retrieve all roles.
-   **Find One Role**: `GET /roles/:id` - Retrieve a specific role by ID.
-   **Update Role**: `PATCH /roles/:id` - Update a specific role by ID.
-   **Delete Role**: `DELETE /roles/:id` - Delete a specific role by ID.

### Permissions Controller

-   **Create Permission**: `POST /permissions` - Create a new permission.
-   **Find All Permissions**: `GET /permissions` - Retrieve all permissions.
-   **Find One Permission**: `GET /permissions/:id` - Retrieve a specific permission by ID.
-   **Update Permission**: `PATCH /permissions/:id` - Update a specific permission by ID.
-   **Delete Permission**: `DELETE /permissions/:id` - Delete a specific permission by ID.
-   **Sync Permissions**: `POST /permissions/sync` - Synchronize permissions from config-file to db.

## Installation

1. Clone the repository

2. Install Dependencies :

```bash
$ npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

-   Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-   Website - [https://nestjs.com](https://nestjs.com/)
-   Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
