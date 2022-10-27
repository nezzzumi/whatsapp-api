import Express, { Router, NextFunction } from 'express';
import { messageController } from '../controllers';
import { AuthMiddleware } from '../middlewares/implementations/AuthMiddleware';
import { AuthService } from '../services/implementations/AuthService';

const whatsAppRoute = Router();

const authMiddleware = new AuthMiddleware(new AuthService());
whatsAppRoute.use((req: Express.Request, res: Express.Response, next: NextFunction) => {
  return authMiddleware.handler(req, res, next);
});

whatsAppRoute.post('/send', (req: Express.Request, res: Express.Response) => {
  return messageController.post(req, res);
});

export { whatsAppRoute };
