// src/auth/dto/controlid-login.dto.ts
import { IsString, IsIP, IsNotEmpty } from 'class-validator';

export class ControlIdLoginDto {
  @IsIP()
  @IsNotEmpty()
  deviceIp: string; // IP do dispositivo Control ID

  @IsString()
  @IsNotEmpty()
  username: string; // usuário do dispositivo

  @IsString()
  @IsNotEmpty()
  password: string; // senha do dispositivo
}