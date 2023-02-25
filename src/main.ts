import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
//import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require('morgan');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const conf = app.get(ConfigService);
  app.use(morgan('combined'));
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const port = conf.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('PunPay API')
    .setDescription('Rest Api for PunPay')
    .setVersion('0.1')
    .addBearerAuth()
    .addBasicAuth()
    .build();

  console.log(`Server started on port : ${port}`);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(port);
}
bootstrap();
