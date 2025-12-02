// src/auth/dto/load-objects.dto.ts
import { IsString, IsNotEmpty, IsIP, IsOptional, IsIn } from 'class-validator';

export class LoadObjectsDto {
  @IsIP()
  @IsNotEmpty()
  deviceIp: string;

  @IsString()
  @IsNotEmpty()
  session: string;

  @IsString()
  @IsIn(['users', 'cards', 'events', 'configurations']) // Valores possíveis
  @IsOptional()
  object: string = 'users'; // Padrão é 'users'
}

export class LoadObjectsBodyDto {
  @IsString()
  @IsNotEmpty()
  object: string;
}