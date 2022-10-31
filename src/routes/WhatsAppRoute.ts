import Express, { Router, NextFunction } from 'express';
import { MessageController } from '../controllers/implementations/MessageController';
import { AuthMiddleware } from '../middlewares/implementations/AuthMiddleware';
import { AuthService } from '../services/implementations/AuthService';
import { WhatsAppService } from '../services/implementations/WhatsAppService';

const whatsAppRoute = Router();

const authMiddleware = new AuthMiddleware(new AuthService());

const messageController = new MessageController(new WhatsAppService());

// eslint-disable-next-line max-len
whatsAppRoute.use((req: Express.Request, res: Express.Response, next: NextFunction) => authMiddleware.handler(req, res, next));

whatsAppRoute.post('/send', (req: Express.Request, res: Express.Response) => messageController.post(req, res));

export { whatsAppRoute };
