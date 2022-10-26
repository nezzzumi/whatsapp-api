import Express, { Router } from 'express';
import { authController, messageController } from './controllers';

const router = Router();

router.post('/auth/login', (req: Express.Request, res: Express.Response) => {
  return authController.post(req, res);
});

router.post('/bot/send', (req: Express.Request, res: Express.Response) => {
  return messageController.post(req, res);
});

export { router };
