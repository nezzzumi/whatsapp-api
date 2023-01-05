import { User } from '@prisma/client';
import { agent } from 'supertest';
import * as bcrypt from 'bcrypt';
import { app } from '../../../app';
import { AuthService } from '../../../services/implementations/AuthService';
import prisma from '../../../database/client';
import { WhatsAppService } from '../../../services/implementations/WhatsAppService';

const password = 'iloveyou';
const user: User = {
  active: true,
  id: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
  password: bcrypt.hashSync(password, 10),
  username: 'itsuser',
};

describe('/api/bot/send', () => {
  test('Autorização inválida', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(null);

    const response = await agent(app)
      .post('/api/bot/send')
      .send({
        to: '5533988888888',
        content: 'oi',
      })
      .set({
        Authorization: 'Bearer a',
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBeTruthy();
  });
  test('Parâmetros inválidos', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(user);
    jest
      .spyOn(WhatsAppService.prototype, 'isReady')
      .mockImplementation(() => true);

    const token = await new AuthService().generateJWT(user);

    const response = await agent(app)
      .post('/api/bot/send')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        bbb: '5533988888888',
        aaa: 'oi',
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeTruthy();
  });
  test('Número inválido', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(user);
    jest
      .spyOn(WhatsAppService.prototype, 'isReady')
      .mockImplementation(() => true);

    const token = await new AuthService().generateJWT(user);

    const response = await agent(app)
      .post('/api/bot/send')
      .send({
        to: '5544',
        content: 'oi',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(422);
    expect(response.body.error).toBeTruthy();
  });
  test('Envio de mensagem de texto', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValue(user);
    prisma.message.create = jest.fn().mockReturnValue({
      content: '',
      to: '',
      userId: user.id,
    });
    jest
      .spyOn(WhatsAppService.prototype, 'isReady')
      .mockImplementation(() => true);
    jest
      .spyOn(WhatsAppService.prototype, 'sendText')
      .mockImplementation(async (_to: string, _content: string) => ({}));

    const token = await new AuthService().generateJWT(user);
    const response = await agent(app)
      .post('/api/bot/send')
      .send({
        to: '5533988888888',
        content: 'oi',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
  test('Envio de imagem inválida', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValue(user);
    prisma.message.create = jest.fn().mockReturnValue({
      content: '',
      to: '',
      userId: user.id,
    });
    jest
      .spyOn(WhatsAppService.prototype, 'isReady')
      .mockImplementation(() => true);
    jest
      .spyOn(WhatsAppService.prototype, 'sendImage')
      .mockImplementation(
        async (_to: string, _image: string, _caption?: string) => ({})
      );

    const token = await new AuthService().generateJWT(user);
    const response = await agent(app)
      .post('/api/bot/send')
      .send({
        to: '5533988888888',
        content: 'oi',
        image: 'YQo=',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(422);
    expect(response.body.error).toBeTruthy();
  });
  test('Envio de imagem', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValue(user);
    prisma.message.create = jest.fn().mockReturnValue({
      content: '',
      to: '',
      userId: user.id,
    });
    jest
      .spyOn(WhatsAppService.prototype, 'isReady')
      .mockImplementation(() => true);
    jest
      .spyOn(WhatsAppService.prototype, 'sendImage')
      .mockImplementation(
        async (_to: string, _image: string, _caption?: string) => ({})
      );

    const token = await new AuthService().generateJWT(user);
    const response = await agent(app)
      .post('/api/bot/send')
      .send({
        to: '5533988888888',
        content: 'oi',
        image:
          'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQAAAADsdIMmAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAd2KE6QAAAAHdElNRQfmDA4UKwKqt1/kAAAADElEQVQI12P4z4ACAT/QB/mI84VSAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTEyLTE0VDIwOjQzOjAyKzAwOjAwTZcIBAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMi0xNFQyMDo0MzowMiswMDowMDzKsLgAAAAASUVORK5CYII=',
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});
