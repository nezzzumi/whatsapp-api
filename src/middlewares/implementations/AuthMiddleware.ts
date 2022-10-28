import Express, { NextFunction } from 'express';
import * as jose from 'jose';
import { isNumeric, parseAuthorizationHeader } from '../../helpers/helpers';
import { AuthService } from '../../services/implementations/AuthService';
import { IMiddleware } from '../IMiddleware';
import { HttpError } from '../../errors/HttpError';

export class AuthMiddleware implements IMiddleware {
  constructor(public service: AuthService) {}

  async handler(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction,
  ): Promise<Express.Response | void> {
    try {
      const authorization = req.headers.authorization || '';

      const token = parseAuthorizationHeader(authorization);

      if (!token) {
        throw new HttpError('Não autorizado.', 401);
      }

      const secretKey = process.env.JWT_SECRET_KEY;

      if (!secretKey) {
        console.error('JWT_SECRET_KEY não definido.');
        throw new HttpError('Erro ao verificar token.', 500);
      }

      const jwtPayload = await (
        await jose.jwtVerify(token, new TextEncoder().encode(secretKey))
      ).payload;

      const userId = jwtPayload.sub;

      if (!userId || !isNumeric(userId)) {
        console.error('JWT com sub inválido.');
        throw new HttpError('Token inválido.', 401);
      }

      const user = await this.service.findUserById(Number(userId));

      if (!user) {
        throw new HttpError('Usuário inexistente.', 401);
      }

      if (!user.active) {
        throw new HttpError('Usuário inativo.', 401);
      }

      return next();
    } catch (err) {
      if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
          error: true,
          msg: err.message,
        });
      }

      if (err instanceof jose.errors.JOSEError) {
        return res.status(401).json({
          error: true,
          msg: 'Não autorizado.',
        });
      }
      console.error(err);

      return res.status(500).json({
        error: true,
        msg: 'Erro interno.',
      });
    }
  }
}
