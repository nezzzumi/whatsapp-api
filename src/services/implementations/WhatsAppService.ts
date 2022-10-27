import { IService } from '../IService';
import * as venom from 'venom-bot';

export class WhatsAppService implements IService {
  private bot?: venom.Whatsapp;

  constructor() {
    venom
      .create({
        session: 'bot',
        multidevice: true,
        browserArgs: [
          '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36',
        ],
      })
      .then((session) => (this.bot = session))
      .catch(console.error);
  }

  isReady(): boolean {
    return this.bot !== undefined;
  }

  async send(to: string, content: string): Promise<Object | undefined> {
    return this.bot?.sendText(`${to}@c.us`, content);
  }
}
