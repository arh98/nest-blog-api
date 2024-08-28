import { Global, Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';

@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get<string>('appConfig.mailHost'),
                    secure: false,
                    port: config.get('appConfig.mailPort'),
                    auth: {
                        user: config.get('appConfig.smtpUsername'),
                        pass: config.get('appConfig.smtpPassword'),
                    },
                },
                defaults: {
                    from: `"My Blog" <no-repy@nestjs-blog.com>`,
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule {}
