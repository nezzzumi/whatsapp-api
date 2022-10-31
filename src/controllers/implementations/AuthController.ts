import Express from 'express';
import * as jose from 'jose';
import { HttpError } from '../../errors/HttpError';
import { AuthService } from '../../services/implementations/AuthService';
import IController from '../IController';

export class AuthController implements IController {
  public service: AuthService;

  constructor(service: AuthService) {
    this.service = service;
  }

  async post(req: Express.Request, res: Express.Response): Promise<Express.Response> {
    const { username, password } = req.body;

    if (!(username && password)) {
      return res.status(400).json({
        error: true,
        msg: 'Parâmetros inválidos.',
      });
    }

    try {
      const user = await this.service.login(username, password);
      const token = await this.service.generateJWT(user);

      const jwtPayload = jose.decodeJwt(token);

      if (!jwtPayload.exp || !jwtPayload.iat) {
        console.error('exp ou iat não definidos.');
        throw new HttpError('Erro ao gerar token.', 500);
      }

      const expiresIn = new Date(jwtPayload.exp - jwtPayload.iat).getTime();

      return res.json({
        error: false,
        msg: 'Login realizado com sucesso.',
        token,
        expiresIn,
      });
    } catch (err) {
      if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
          error: true,
          msg: err.message,
        });
      }

      console.error(err);

      return res.status(500).json({
        error: true,
        msg: 'Erro interno, contate o administrador.',
      });
    }
  }
}
