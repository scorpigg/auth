import express from 'express';
import 'dotenv/config.js';
import cors from 'cors';
import { router } from './router';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewares/error-middleware';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: '*' }));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();