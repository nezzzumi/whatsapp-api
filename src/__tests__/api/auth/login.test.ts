import { agent } from 'supertest';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../../database/client';
import { app } from '../../../app';

describe('/api/auth/login', () => {
  test('Parâmetros inválidos', async () => {
    const response = await agent(app).post('/api/auth/login').send({
      aaa: 'oi',
      bbb: 'xau',
    });

    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(400);
  });
  test('Credenciais inválidas', async () => {
    prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);

    const response = await agent(app).post('/api/auth/login').send({
      username: 'oi',
      password: 'xau',
    });

    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(200);
  });

  test('Credenciais corretas', async () => {
    const password = 'iloveyou';

    const user: User = {
      id: 1,
      active: true,
      password: bcrypt.hashSync(password, 10),
      username: 'itsuser',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prisma.user.findFirst = jest.fn().mockReturnValueOnce(user);

    const response = await agent(app).post('/api/auth/login').send({
      username: user.username,
      password,
    });

    expect(response.body.error).toBeFalsy();
    expect(response.status).toBe(200);
  });
  test('Usuário inativo', async () => {
    const password = 'iloveyou';

    const user: User = {
      id: 1,
      active: false,
      password: bcrypt.hashSync(password, 10),
      username: 'itsuser',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prisma.user.findFirst = jest.fn().mockReturnValueOnce(user);

    const response = await agent(app).post('/api/auth/login').send({
      username: user.username,
      password,
    });

    expect(response.body.error).toBeTruthy();
    expect(response.status).toBe(401);
  });
});
