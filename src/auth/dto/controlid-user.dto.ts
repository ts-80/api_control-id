// src/auth/dto/controlid-user.dto.ts
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