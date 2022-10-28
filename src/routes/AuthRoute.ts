import Express, { Router } from 'express';
import { authController } from '../controllers';

const authRouter = Router();

authRouter.post('/login', (req: Express.Request, res: Express.Response) => authController.post(req, res));

export { authRouter };
