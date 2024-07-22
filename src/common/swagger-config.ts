import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Blog API')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
        'MIT License',
        'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:3000/')
    .setVersion('1.0')
    .build();
