import { config } from 'dotenv';
import express from 'express';
import { router } from './routes';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.listen(port);
