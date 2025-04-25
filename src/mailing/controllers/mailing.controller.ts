import { Controller, Post, Body, UseGuards, InternalServerErrorException, HttpCode } from '@nestjs/common';
import { MailUserService } from '../services/mail-user.service';
import { MailNotificationService } from '../services/mail-notification.service';
import { CreateMailDto } from '../dto/create-mail.dto';
import { ApiKeyGuard } from 'src/guards/auth-guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

@ApiTags('Mailing')
@ApiBearerAuth('API Key')
@Controller('mailing')
export class MailingController {
  constructor(
    private readonly userMailService: MailUserService,
    private readonly notificationService: MailNotificationService
  ) {}

  @Post()
  @HttpCode(202)
  @UseGuards(ApiKeyGuard)
  @ApiOperation({
    summary: 'Envia e-mail al usuario proveniente del formulario de contacto',
  })
  @ApiResponse({
    status: 202,
    description:
      'Email enviado con éxito',
    type: CreateMailDto,
    schema: {
      $ref: getSchemaPath(CreateMailDto),
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error al enviar el correo.',
  })
  
  async sendMail(@Body() createMailDto: CreateMailDto) {
    try {
      await Promise.all([
        this.userMailService.usercontactMail(createMailDto),
        this.notificationService.mailNotification(createMailDto),
      ]);
  
      return { success: true, message: 'Email enviado con éxito', status: 202 };
    } catch (error) {
      throw new InternalServerErrorException(`Error sending email: ${error.message}`);
    }
  }
  
}
