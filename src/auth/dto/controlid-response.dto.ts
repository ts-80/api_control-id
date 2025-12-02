// src/auth/dto/controlid-response.dto.ts
export class ControlIdLoginResponseDto {
  session: string;
  success: boolean;
  message?: string;
  deviceIp?: string;
}