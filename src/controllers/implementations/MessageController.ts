import { Request, Response } from 'express';
import * as jose from 'jose';
import { Buttons } from 'whatsapp-web.js';
import { HttpError } from '../../errors/HttpError';
import { getImageTypeFromBuffer, parseAuthorizationHeader } from '../../helpers/helpers';
import { WhatsAppService } from '../../services/implementations/WhatsAppService';
import IController from '../IController';

export class MessageController implements IController {
  public service;

  constructor(service: WhatsAppService) {
    this.service = service;
  }

  async post(req: Request, res: Response): Promise<Response> {
    const {
      to,
      content,
      image,
      buttons,
    }: {
      to: string;
      content: string;
      image: string;
      buttons: { body: string }[];
    } = req.body;

    if (!this.service.isReady()) {
      return res.status(503).json({
        error: true,
        msg: 'O serviço ainda não está pronto para uso.',
      });
    }

    if (
      !to
      || !content
      || typeof to !== 'string'
      || typeof content !== 'string'
    ) {
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
      const buttonOptions = [];

      if (buttons) {
        for (let i = 0; i < buttons.length; i += 1) {
          const { body: buttonBody } = buttons[i];

          if (!buttonBody || typeof buttonBody !== 'string') {
            throw new HttpError('Parâmetros inválidos.', 422);
          }

          // Necessário porque pode ser enviado mais alguma propriedade além do body.
          buttonOptions.push({ body: buttonBody });
        }

        const button = new Buttons(content, buttonOptions);
        await this.service.sendButtons(to, button);
      } else if (image) {
        const imageBuffer = Buffer.from(image, 'base64');
        const fileType = await getImageTypeFromBuffer(imageBuffer);

        if (!fileType) {
          return res.status(422).json({
            error: true,
            msg: 'Imagem inválida.',
          });
        }

        await this.service.sendImage(to, image, content);
      } else {
        await this.service.sendText(to, content);
      }
    } catch (err: any) {
      const detail = 'Erro interno.';

      if (err instanceof HttpError) {
        return res
          .status(err.statusCode)
          .json({ error: true, msg: err.message });
      }

      console.error(err);

      return res.status(500).json({
        error: true,
        msg: 'Não foi possível enviar a mensagem.',
        detail,
      });
    }

    // eslint-disable-next-line max-len
    // There is no problem doing this because the authorization token has already been validated by the auth middleware.
    const authorization = req.headers.authorization as string;
    const userId = jose.decodeJwt(parseAuthorizationHeader(authorization)).sub as string;

    await this.service.logMessage(Number(userId), to, content);

    return res.json({
      error: false,
      msg: 'Mensagem enviada com sucesso.',
    });
  }
}
