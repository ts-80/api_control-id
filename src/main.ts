// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // HABILITAR CORS - IMPORTANTE!
  app.enableCors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:8080'], // Portas comuns para servidores locais
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });
  
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