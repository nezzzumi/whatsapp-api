/* eslint-disable class-methods-use-this */
import * as venom from 'venom-bot';
import { IService } from '../IService';
import prisma from '../../database/client';
import { HttpError } from '../../errors/HttpError';

export class WhatsAppService implements IService {
  private bot?: venom.Whatsapp;

  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      venom
        .create({
          session: 'bot',
          multidevice: true,
          browserArgs: [
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
          ],
        })
        .then((session) => {
          this.bot = session;
        })
        .catch(console.error);
    }
  }

  isReady(): boolean {
    return this.bot !== undefined;
  }

  async sendText(to: string, content: string): Promise<Object | undefined> {
    return this.bot?.sendText(`${to}@c.us`, content);
  }

  /**
   * Envia imagem
   * @param to Número do destinatário
   * @param content Conteúdo da imagem em base64
   * @param text Texto a ser enviado
   */
  async sendImage(to: string, content: string, text?: string): Promise<Object | undefined> {
    return this.bot?.sendImageFromBase64(`${to}@c.us`, content, 'image', text);
  }

  async logMessage(userId: number, to: string, content: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new HttpError('Usuário inválido.', 401);
    }

    await prisma.message.create({
      data: {
        content,
        to,
        userId: user.id,
      },
    });
  }
}
