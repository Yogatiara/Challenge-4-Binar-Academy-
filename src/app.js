import express from 'express';
import morgan from 'morgan';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import requestTime from './middlewares/requestTimeMiddleware.js';
import carRouter from './routes/carRoute.js';
import sequalize from '../configs/databaseConfig.js';

const app = express();
// sequalize.sync();
// sequalize.drop();

app.use(express.json());
app.use(requestTime);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));
const __dirname_ = dirname(__filename);

app.use(express.static(`${__dirname}/public`));
app.set('views', __dirname_ + '/views');
app.set('view engine', 'ejs');

app.use('/dashboard', carRouter);
export default app;
