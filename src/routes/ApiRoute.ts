import { Router } from 'express';
import { authRouter } from './AuthRoute';
import { whatsAppRoute } from './WhatsAppRoute';

const apiRouter = Router();

apiRouter.use('/bot', whatsAppRoute);
apiRouter.use('/auth', authRouter);

export { apiRouter };
