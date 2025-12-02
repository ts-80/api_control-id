// src/auth/controlid.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  Query, 
  HttpException, 
  HttpStatus,
  Param 
} from '@nestjs/common';
import { ControlIdService, ControlIdUser } from './controlid.service';

@Controller('controlid')
export class ControlIdController {
  constructor(
    private readonly controlIdService: ControlIdService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { deviceIp: string; username: string; password: string }
  ) {
    try {
      const { deviceIp, username, password } = body;
      
      if (!deviceIp || !username || !password) {
        throw new HttpException(
          'deviceIp, username e password são obrigatórios',
          HttpStatus.BAD_REQUEST
        );
      }

      const result = await this.controlIdService.loginToControlId({
        deviceIp,
        username,
        password
      });
      
      return result;
      
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: error.message || 'Erro ao conectar com dispositivo',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Post('load-objects')
  async loadObjects(
    @Body() body: { deviceIp: string; session: string; objectType?: string }
  ) {
    try {
      const { deviceIp, session, objectType = 'users' } = body;
      
      if (!deviceIp || !session) {
        throw new HttpException(
          'deviceIp e session são obrigatórios',
          HttpStatus.BAD_REQUEST
        );
      }

      const result = await this.controlIdService.loadObjects(deviceIp, session, objectType);
      
      return {
        success: true,
        data: result,
        objectType,
        count: result.users?.length || 0,
        deviceIp
      };
      
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: error.message || 'Erro ao carregar objetos',
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Post('users')
  async listUsers(
    @Body() body: { deviceIp: string; session: string }
  ) {
    try {
      const { deviceIp, session } = body;
      
      if (!deviceIp || !session) {
        throw new HttpException(
          'deviceIp e session são obrigatórios',
          HttpStatus.BAD_REQUEST
        );
      }

      const users = await this.controlIdService.listUsers(deviceIp, session);
      
      return {
        success: true,
        users,
        count: users.length,
        deviceIp
      };
      
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: error.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get('users/count')
  async countUsers(
    @Query('deviceIp') deviceIp: string,
    @Query('session') session: string
  ) {
    try {
      if (!deviceIp || !session) {
        throw new HttpException(
          'deviceIp e session são obrigatórios',
          HttpStatus.BAD_REQUEST
        );
      }

      const count = await this.controlIdService.countUsers(deviceIp, session);
      
      return {
        success: true,
        count,
        deviceIp
      };
      
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: error.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get('users/:id')
  async getUser(
    @Query('deviceIp') deviceIp: string,
    @Query('session') session: string,
    @Param('id') id: string
  ) {
    try {
      if (!deviceIp || !session) {
        throw new HttpException(
          'deviceIp e session são obrigatórios',
          HttpStatus.BAD_REQUEST
        );
      }

      const userId = parseInt(id, 10);
      if (isNaN(userId)) {
        throw new HttpException('ID deve ser um número', HttpStatus.BAD_REQUEST);
      }

      const user = await this.controlIdService.getUserById(deviceIp, session, userId);
      
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      
      return {
        success: true,
        user,
        deviceIp
      };
      
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: error.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  @Get('users/search/:name')
  async searchUsers(
    @Query('deviceIp') deviceIp: string,
    @Query('session') session: string,
    @Param('name') name: string
  ) {
    try {
      if (!deviceIp || !session) {
        throw new HttpException(
          'deviceIp e session são obrigatórios',
          HttpStatus.BAD_REQUEST
        );
      }

      const users = await this.controlIdService.searchUsersByName(deviceIp, session, name);
      
      return {
        success: true,
        users,
        count: users.length,
        searchTerm: name,
        deviceIp
      };
      
    } catch (error: any) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_GATEWAY,
          error: error.message,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}