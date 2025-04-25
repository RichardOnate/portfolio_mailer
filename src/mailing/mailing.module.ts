import { Module } from '@nestjs/common';
import { MailingController } from './controllers/mailing.controller';
import { MailUserService } from './services/mail-user.service';
import { SendMailService } from './services/sendmail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { MailNotificationService } from './services/mail-notification.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST'),
          port: Number(config.get('MAIL_PORT')),
          secure: false,
          from: `"Richard Oñate" <${config.get('MAIL_DISPLAY')}>`,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `Richard Oñate <${config.get('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, '/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailingController],
  providers: [MailUserService, SendMailService, MailNotificationService],
  exports: [MailUserService, SendMailService],
})
export class MailingModule {}
