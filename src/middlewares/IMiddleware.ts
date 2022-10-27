import { IService } from '../services/IService';
import Express, { NextFunction } from 'express';

export interface IMiddleware {
  service?: IService;
  handler(
    req: Express.Request,
    res: Express.Response,
    next: NextFunction
  ): Promise<Express.Response | void>;
}
