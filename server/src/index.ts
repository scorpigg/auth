import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './router';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(router);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();