import { AuthService } from '../services/implementations/AuthService';
import { WhatsAppService } from '../services/implementations/WhatsAppService';
import { AuthController } from './implementations/AuthController';
import { MessageController } from './implementations/MessageController';

const authController = new AuthController(new AuthService());

const messageController = new MessageController(new WhatsAppService());

export { authController, messageController };
