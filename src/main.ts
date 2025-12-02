// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Ativar validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove propriedades não declaradas no DTO
    transform: true, // transforma tipos automaticamente
    forbidNonWhitelisted: true, // rejeita propriedades não declaradas
  }));
  
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();