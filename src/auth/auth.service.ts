// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  private activeSessions = new Map<string, string>(); // Para armazenar sessões em memória

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { login, password } = loginDto;

    // Validação básica
    if (!login || !password) {
      throw new Error('Login e senha são obrigatórios');
    }

    // Aqui você implementaria a lógica real de autenticação
    // Exemplo: verificar no banco de dados, LDAP, etc.
    const isValid = await this.validateCredentials(login, password);

    if (!isValid) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar um token/sessão
    const sessionToken = this.generateSessionToken();
    
    // Armazenar a sessão (em produção, use Redis ou database)
    this.activeSessions.set(sessionToken, login);

    return {
      session: sessionToken,
      message: 'Login realizado com sucesso'
    };
  }

  private async validateCredentials(login: string, password: string): Promise<boolean> {
    // Implemente sua lógica de validação aqui
    // Exemplo com usuário fixo (substitua pela sua lógica)
    return login === 'admin' && password === 'admin';
  }

  private generateSessionToken(): string {
    // Gera um token único
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2);
  }

  async validateSession(sessionToken: string): Promise<boolean> {
    return this.activeSessions.has(sessionToken);
  }

  async logout(sessionToken: string): Promise<void> {
    this.activeSessions.delete(sessionToken);
  }
}