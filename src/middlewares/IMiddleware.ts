import Express, { NextFunction } from 'express';
import { IService } from '../services/IService';

export interface IMiddleware {
  service?: IService;
  handler(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ): Promise<Express.Response | void>;
}
