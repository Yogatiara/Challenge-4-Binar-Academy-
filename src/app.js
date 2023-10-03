import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import requestTime from './middlewares/requestTimeMiddleware.js';
import carRouter from './routes/carRoute.js';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(requestTime);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(`${__dirname}/public`));

app.use('/dashboard', carRouter);
export default app;