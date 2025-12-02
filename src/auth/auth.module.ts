// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ControlIdService } from './controlid.service';
import { HttpModule } from '@nestjs/axios';
import { ControlIdController } from './controlid.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    })
  ],
  controllers: [ControlIdController],
  providers: [ControlIdService],
  exports: [ControlIdService],
})
export class AuthModule {}