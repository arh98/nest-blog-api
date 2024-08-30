import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { AuthType } from '../auth/authentication/enums/auth-type.enum';

@Controller('uploads')
@Auth(AuthType.None)
export class UploadsController {
    constructor(private readonly service: UploadsService) {}

    @UseInterceptors(FileInterceptor('file'))
    @ApiHeaders([
        { name: 'Content-Type', description: 'multipart/form-data' },
        { name: 'Authorization', description: 'Bearer Token' },
    ])
    @ApiOperation({
        summary: `Upload a new image to the server`,
    })
    @Post('file')
    public uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body('postId') postId: number, // Accept postId from the request body
    ) {
        return this.service.uploadFile(file, postId);
    }
}
