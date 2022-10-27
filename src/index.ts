import { config } from 'dotenv';
import express from 'express';
import { apiRouter } from './routes/ApiRoute';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port);
