/* eslint-disable class-methods-use-this */
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as jose from 'jose';
import { createSecretKey } from 'crypto';
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

  async generateJWT(user: User): Promise<string> {
    if (!process.env.JWT_SECRET_KEY) {
      console.error('Erro na variável de ambiente JWT_SECRET_KEY.');

      throw new HttpError('Erro interno, contate o administrador.', 500);
    }

    const token = await new jose.SignJWT({ username: user.username })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setSubject(user.id.toString())
      .setIssuedAt()
      .setExpirationTime(process.env.JWT_EXPIRES_IN || '30min')
      .sign(createSecretKey(process.env.JWT_SECRET_KEY, 'utf8'));

    return token;
  }
}
