import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import * as hbs from 'handlebars';
import { join } from 'path';
import { readFileSync } from 'fs';

type MailError = {
  statusCode: number;
  message: string;
};

@Injectable()
export class SendMailService {
  protected to: string;
  protected subject: string;
  protected template: string;
  protected context: any;

  constructor(private readonly mailerService: MailerService) {}

  /**
   * Envía un correo electrónico utilizando un servicio de correo.
   *
   * @returns {Promise<SentMessageInfo | MailError>} Una promesa que se resuelve cuando el correo electrónico ha sido enviado.
   */
  async sendMail(): Promise<SentMessageInfo | MailError> {
    if (
      this.to === undefined ||
      this.subject === undefined ||
      this.template === undefined ||
      this.context === undefined
    ) {
      const response = {
        statusCode: 500,
        message: `Error sending mail : ${'Faltan datos'}`,
      } as MailError;

      return response;
    }

    const templatePath = join(
      __dirname,
      '../../templates',
      `${this.template}.hbs`,
    );
    const source = readFileSync(templatePath, 'utf-8').toString();
    const compiledTemplate = hbs.compile(source);

    const mailOptions = {
      to: this.to,
      subject: this.subject,
      html: compiledTemplate(this.context),
    };

    try {
      return await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      const response = {
        statusCode: 500,
        message: `Error sending mail : ${error}`,
      } as MailError;

      return response;
    }
  }
}
