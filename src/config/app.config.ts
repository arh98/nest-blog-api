import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
    environment: process.env.NODE_ENV || 'production',
    apiVersion: process.env.API_VERSION,
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    smtpUsername: process.env.MAIL_USER,
    smtpPassword: process.env.MAIL_PASSWORD,
    awsBucketName: process.env.LIARA_BUCKET_NAME,
    awsAccessKeyId: process.env.LIARA_ACC_KEY,
    awsSecretAccessKey: process.env.LIARA_SECRET_KEY,
    awsCloudfrontUrl: process.env.LIARA_API_ENPOINT,
}));
