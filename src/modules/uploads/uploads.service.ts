import {
    BadRequestException,
    Injectable,
    RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
    PutObjectCommand,
    GetObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { FileType } from './enums/file-type.enum';
import { Upload } from './entities/upload.entity';
import { IUploadedFile } from './types/uploaded-file.interface';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadsService {
    private readonly client: S3Client;

    constructor(
        @InjectRepository(Upload)
        private readonly uploadsRepo: Repository<Upload>,
        private readonly configService: ConfigService,
    ) {
        this.client = new S3Client({
            region: 'default',
            endpoint: this.configService.get<string>(
                'appConfig.awsCloudfrontUrl',
            ),
            credentials: {
                accessKeyId: this.configService.get<string>(
                    'appConfig.awsAccessKeyId',
                ),
                secretAccessKey: this.configService.get<string>(
                    'appConfig.awsSecretAccessKey',
                ),
            },
        });
    }

    async uploadFile(file: Express.Multer.File, postId: number) {
        this.validateFileType(file.mimetype);

        try {
            await this.uploadToLiara(file);
            const downloadUrl = await this.getDownloadUrl(file.originalname);
            const uploadFile = this.createUploadFileObject(file, downloadUrl);

            await this.uploadsRepo.save(
                this.uploadsRepo.create({
                    ...uploadFile,
                    post: { id: postId },
                }),
            );

            return { message: 'File uploaded successfully', url: downloadUrl };
        } catch (error) {
            throw new RequestTimeoutException(error.message);
        }
    }

    private validateFileType(mimeType: string) {
        const validMimeTypes = [
            'image/gif',
            'image/jpeg',
            'image/jpg',
            'image/png',
        ];
        if (!validMimeTypes.includes(mimeType)) {
            throw new BadRequestException('MIME type not supported');
        }
    }

    private async uploadToLiara(file: Express.Multer.File) {
        const params = {
            Body: file.buffer,
            Bucket: this.configService.get<string>('appConfig.awsBucketName'),
            Key: file.originalname,
        };

        await this.client.send(new PutObjectCommand(params));
    }

    private createUploadFileObject(
        file: Express.Multer.File,
        downloadUrl: string,
    ): IUploadedFile {
        return {
            name: this.generateUniqueFileName(file),
            path: downloadUrl,
            type: FileType.IMAGE,
            mime: file.mimetype,
            size: file.size,
        };
    }
    private async getDownloadUrl(filename: string) {
        const params = {
            Bucket: this.configService.get<string>('appConfig.awsBucketName'),
            Key: filename,
        };

        const command = new GetObjectCommand(params);
        return await getSignedUrl(this.client, command);
    }

    private generateUniqueFileName(file: Express.Multer.File) {
        const [name, extension] = file.originalname.split('.');
        const sanitizedName = name.replace(/\s/g, '').trim();
        const timeStamp = Date.now().toString();

        return `${sanitizedName}-${timeStamp}-${randomUUID()}.${extension}`;
    }
}
