import { Injectable } from '@nestjs/common';
import { SendMailService } from './sendmail.service';
import { MailerService } from '@nestjs-modules/mailer'
import { CreateMailDto } from '../dto/create-mail.dto';


@Injectable()
export class MailUserService extends SendMailService {
constructor(
    mailerService: MailerService
    ) {
    super(mailerService);
    }

    async usercontactMail(data: CreateMailDto) {
      const { email } = data
      this.to = email;
      this.subject = 'Formulario de contacto';
      this.template = 'contact-form-user';
      this.context = data;
  
      return await this.sendMail();
 
    }
}
