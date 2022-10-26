import { AuthService } from '../services/implementations/AuthService';
import { AuthController } from './implementations/AuthController';
import { MessageController } from './implementations/MessageController';

const authController = new AuthController(new AuthService());
const messageController = new MessageController();

export { authController, messageController };
