import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { IdFaceService } from './idface/idface.service';
import { CreateUserDto } from './idface/dto/createUser.dto';
import { UpdateUserDto } from './idface/dto/updateUser.dto';

@Controller('idface')
export class IdFaceController {
  constructor(private readonly service: IdFaceService) {}

  @Get('users')
  listUsers() {
    console.log('Chamou listUsers()');
    return this.service.listUsers();
  }

  @Post('users')
  createUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }

  @Get('users/:id')
  getUser(@Param('id') id: number) {
    return this.service.getUser(id);
  }

  @Put('users/:id')
  updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return this.service.updateUser(id, dto);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: number) {
    return this.service.deleteUser(id);
  }

  @Post('users/:id/face')
  uploadFace(@Param('id') id: number) {
    // Exemplo: caminho fixo (depois você troca por upload real)
    return this.service.uploadFace(id, './foto.jpg');
  }

  @Get('events')
  listEvents() {
    return this.service.listEvents();
  }
}
