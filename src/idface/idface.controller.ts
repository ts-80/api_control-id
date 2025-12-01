import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { IdFaceService } from './idface.service';

@Controller('idface')   // <-- ESSENCIAL
export class IdFaceController {

  constructor(private readonly service: IdFaceService) {}

  @Get('users')
  listUsers() {
    return this.service.listUsers();
  }
}
