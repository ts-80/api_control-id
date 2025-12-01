import { Injectable } from '@nestjs/common';
import axios from 'axios';
import FormData from 'form-data';
import * as fs from 'fs';

@Injectable()
export class IdFaceService {
  private api;

  private IP = '172.32.10.56';      // IP do iDFace
  private USER = 'admin';
  private PASS = 'admin';

  constructor() {
    this.api = axios.create({
      baseURL: `http://${this.IP}`,
      auth: {
        username: this.USER,
        password: this.PASS,
      },
      timeout: 5000,
    });
  }

  // LISTAR
  async listUsers() {
    const res = await this.api.get('/users');
    return res.data;
  }

  // CRIAR
  async createUser(dto) {
    const res = await this.api.post('/users', dto);
    return res.data;
  }

  // BUSCAR POR ID
  async getUser(id: number) {
    const res = await this.api.get(`/users/${id}`);
    return res.data;
  }

  // ATUALIZAR
  async updateUser(id: number, dto) {
    const res = await this.api.put(`/users/${id}`, dto);
    return res.data;
  }

  // DELETAR
  async deleteUser(id: number) {
    const res = await this.api.delete(`/users/${id}`);
    return res.data;
  }

  // ENVIAR FOTO (FACE)
  async uploadFace(id: number, imagePath: string) {
    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));

    const res = await this.api.post(`/users/${id}/faces`, form, {
      headers: form.getHeaders(),
    });

    return res.data;
  }

  // EVENTOS / LOGS
  async listEvents() {
    const res = await this.api.get('/events');
    return res.data;
  }
}
