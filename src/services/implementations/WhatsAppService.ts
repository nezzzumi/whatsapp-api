/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { Buttons, Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import type { Chat } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { IService } from '../IService';
import prisma from '../../database/client';
import { HttpError } from '../../errors/HttpError';

export class WhatsAppService implements IService {
  private bot: Client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true },
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
  });

  private _isReady: boolean = false;

  isReady() {
    return this._isReady;
  }

  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      this.bot.on('ready', () => {
        console.log('Client is ready!');
        this._isReady = true;
      });

      this.bot.on('qr', this.showQRCode);

      this.bot.initialize();
    }
  }

  /**
   * Verifica se o número informado existe no WhatsApp e retorna o chat.
   * @param to Número do destinatário
   * @returns Chat do número
   */
  private async getChat(to: string): Promise<Chat> {
    const contactId = await this.bot.getNumberId(to);

    if (!contactId) {
      throw new HttpError('Número não registrado.', 500);
    }

    // eslint-disable-next-line no-underscore-dangle
    const chat = await this.bot.getChatById(contactId._serialized);

    return chat;
  }

  /**
   * Mostra QRCode do WhatsApp no terminal.
   * @param content Conteúdo do QRCode
   */
  private async showQRCode(content: string) {
    qrcode.generate(content, { small: true });
  }

  async sendText(to: string, content: string): Promise<Object | undefined> {
    const chat = await this.getChat(to);

    return chat.sendMessage(content);
  }

  /**
   * Envia imagem
   * @param to Número do destinatário
   * @param image Conteúdo da imagem em base64
   * @param caption Texto a ser enviado
   */
  async sendImage(
    to: string,
    image: string,
    caption?: string
  ): Promise<Object | undefined> {
    const chat = await this.getChat(to);
    const media = new MessageMedia('image/png', image);

    const result = await chat.sendMessage(media, { caption });

    return result;
  }

  /**
   * Envia botões
   * @param to Número do destinatário
   * @param button Botões do WhatsApp
   */
  async sendButtons(to: string, button: Buttons): Promise<Object | undefined> {
    const chat = await this.getChat(to);

    const result = await chat.sendMessage(button);

    return result;
  }

  /**
   * Registra envio de mensagem no banco de dados.
   * @param userId ID do usuário que enviou a mensagem
   * @param to Destinatário da mensagem
   * @param content Conteúdo da mensagem
   */
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
