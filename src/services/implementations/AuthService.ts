import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from '../../database/client';
import { HttpError } from '../../errors/HttpError';
import { IService } from '../IService';

export class AuthService implements IService {
  async login(username: string, password: string): Promise<User> {
    const user = await prisma.user.findFirst({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpError('Credenciais inválidas.', 200);
    }

    if (!user.active) {
      throw new HttpError('Usuário inativo.', 401);
    }

    return user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { id } });

    return user;
  }
}
