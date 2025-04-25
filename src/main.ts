import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  const allowedOrigins = process.env.CLIENT_URL?.split(',').map(url => url.trim()) ?? [];

app.enableCors({
  origin: (origin, callback) => {
    console.log(`[CORS] Origin received: ${origin || 'NO ORIGIN'} | ENV: ${process.env.NODE_ENV}`);

    if (process.env.NODE_ENV === 'production' && (!origin || !allowedOrigins.includes(origin))) {
      callback(new Error('Not allowed by CORS'), false);
      return;
    }    
    callback(null, true);
  },
  methods: ['POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
});

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Mailing API')
    .setDescription('API para el envio de correos desde el formulario de contacto de mi Portafolio Personal')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'API Key',
        description: 'API Key de acceso a la API',
      },
      'API Key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();