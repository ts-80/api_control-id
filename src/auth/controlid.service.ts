// src/auth/controlid.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

// 1. Primeiro, crie as interfaces necessárias
export interface ControlIdUser {
  id: number;
  registration: string;
  name: string;
  password: string;
  salt: string;
  expires: number;
  user_type_id: number;
  begin_time: number;
  end_time: number;
}

export interface LoadObjectsResponse {
  users: ControlIdUser[];
}

@Injectable()
export class ControlIdService {
  private readonly logger = new Logger(ControlIdService.name);

  constructor(private readonly httpService: HttpService) {}

  // Método de login (se ainda não tiver)
  async loginToControlId(params: {
    deviceIp: string;
    username: string;
    password: string;
  }): Promise<any> {
    const { deviceIp, username, password } = params;
    
    try {
      const url = `http://${deviceIp}/login.fcgi`;
      
      this.logger.log(`Tentando login no dispositivo: ${deviceIp}`);
      
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          {
            login: username,
            password: password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      );

      this.logger.debug(`Resposta do login:`, response.data);
      
      if (response.data && response.data.session) {
        return {
          session: response.data.session,
          success: true,
          message: 'Login realizado com sucesso',
          deviceIp: deviceIp
        };
      } else {
        throw new Error('Resposta inválida do dispositivo');
      }
      
    } catch (error: any) {
      this.logger.error(`Erro no login: ${error.message}`);
      throw new Error(`Falha ao conectar com dispositivo ${deviceIp}: ${error.message}`);
    }
  }

  async loadObjects(
    deviceIp: string, 
    session: string, 
    objectType: string = 'users'
  ): Promise<LoadObjectsResponse> {
    try {
      const url = `http://${deviceIp}/load_objects.fcgi`;
      
      this.logger.log(`Carregando objetos do tipo '${objectType}' do dispositivo: ${deviceIp}`);
      
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          {
            object: objectType
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
            params: {
              session: session
            }
          }
        )
      );

      this.logger.debug(`Resposta do load_objects:`, response.data);
      
      if (!response.data) {
        throw new Error('Resposta vazia do dispositivo');
      }

      // Verifica se a resposta tem a estrutura esperada
      if (!response.data.users) {
        this.logger.warn('Resposta não contém propriedade "users":', response.data);
        // Tenta retornar um objeto vazio ou o que vier
        return { users: [] };
      }

      return response.data as LoadObjectsResponse;
      
    } catch (error: any) {
      this.logger.error(`Erro ao carregar objetos: ${error.message}`);
      throw new Error(`Falha ao carregar objetos do dispositivo ${deviceIp}: ${error.message}`);
    }
  }

  // Método específico para listar usuários
  async listUsers(
    deviceIp: string, 
    session: string
  ): Promise<ControlIdUser[]> {
    try {
      const response = await this.loadObjects(deviceIp, session, 'users');
      
      if (response.users && Array.isArray(response.users)) {
        return response.users;
      } else {
        this.logger.warn('Estrutura de resposta inválida:', response);
        return [];
      }
      
    } catch (error: any) {
      this.logger.error(`Erro ao listar usuários: ${error.message}`);
      // Retorna array vazio em caso de erro
      return [];
    }
  }

  // Método para buscar um usuário específico por ID
  async getUserById(
    deviceIp: string, 
    session: string, 
    userId: number
  ): Promise<ControlIdUser | null> {
    try {
      const users = await this.listUsers(deviceIp, session);
      return users.find(user => user.id === userId) || null;
    } catch (error: any) {
      this.logger.error(`Erro ao buscar usuário ${userId}: ${error.message}`);
      return null;
    }
  }

  // Método para buscar usuários por nome
  async searchUsersByName(
    deviceIp: string, 
    session: string, 
    name: string
  ): Promise<ControlIdUser[]> {
    try {
      const users = await this.listUsers(deviceIp, session);
      return users.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error: any) {
      this.logger.error(`Erro ao buscar usuários por nome: ${error.message}`);
      return [];
    }
  }

  // Método para contar usuários
  async countUsers(
    deviceIp: string, 
    session: string
  ): Promise<number> {
    try {
      const users = await this.listUsers(deviceIp, session);
      return users.length;
    } catch (error: any) {
      this.logger.error(`Erro ao contar usuários: ${error.message}`);
      return 0;
    }
  }
}