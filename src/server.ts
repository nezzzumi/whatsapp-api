import { config } from 'dotenv';
import { app } from './app';

config();

const port = process.env.PORT || 3000;

app.listen(port);
