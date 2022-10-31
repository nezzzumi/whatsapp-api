import Express, { Router } from 'express';
import { AuthController } from '../controllers/implementations/AuthController';
import { AuthService } from '../services/implementations/AuthService';

const authRouter = Router();

const authController = new AuthController(new AuthService());
authRouter.post('/login', (req: Express.Request, res: Express.Response) => authController.post(req, res));

export { authRouter };
