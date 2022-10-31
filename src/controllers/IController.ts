/* eslint-disable no-unused-vars, semi, no-extra-semi */

import Express from 'express';
import { IService } from '../services/IService';

export default interface IController {
  service?: IService;
  get?(req: Express.Request, res: Express.Response): Promise<Express.Response>;
  post?(req: Express.Request, res: Express.Response): Promise<Express.Response>;
}
