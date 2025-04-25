import { Injectable } from "@nestjs/common";
import { SendMailService } from './sendmail.service';
import { MailerService } from '@nestjs-modules/mailer'
import { ConfigService } from "@nestjs/config";
import { CreateMailDto } from "../dto/create-mail.dto";

@Injectable()
export class MailNotificationService extends SendMailService {
  constructor(
    mailerService: MailerService,
    private readonly config: ConfigService
  ) {
    super(mailerService);
  }

  async mailNotification(data: CreateMailDto) {

    this.to = String(this.config.get('MAIL_USER'));
    this.subject = 'Notificación de contacto vía formulario';
    this.template = 'contact-form-notification';
    this.context = data;

    return await this.sendMail();
  
  }

}



