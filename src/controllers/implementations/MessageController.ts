import { Request, Response } from 'express';
import * as jose from 'jose';
import { parseAuthorizationHeader } from '../../helpers/helpers';
import IController from '../IController';
import { WhatsAppService } from '../../services/implementations/WhatsAppService';

export class MessageController implements IController {
  public service;

  constructor(service: WhatsAppService) {
    this.service = service;
  }

  async post(req: Request, res: Response): Promise<Response> {
    const { to, content } = req.body;

    if (!this.service.isReady()) {
      return res.status(503).json({
        error: true,
        msg: 'O serviço ainda não está pronto para uso.',
      });
    }

    if (!to || !content || typeof to !== 'string' || typeof content !== 'string') {
      return res.status(400).json({
        error: true,
        msg: 'Parâmetros inválidos.',
      });
    }

    if (!to.startsWith('55') || ![12, 13].includes(to.length)) {
      return res.status(422).json({
        error: true,
        msg: 'Número inválido.',
      });
    }

    try {
      await this.service.send(to, content);
    } catch (err: any) {
      return res.json({
        error: true,
        msg: 'Não foi possível enviar a mensagem.',
        result: err.text,
      });
    }

    // eslint-disable-next-line max-len
    // There is no problem in doing this because the authorization token has already been validated by the auth middleware.
    const authorization = req.headers.authorization as string;
    const userId = jose.decodeJwt(parseAuthorizationHeader(authorization)).sub as string;

    await this.service.logMessage(Number(userId), to, content);

    return res.json({
      error: false,
      msg: 'Mensagem enviada com sucesso.',
    });
  }
}
