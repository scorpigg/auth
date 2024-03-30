import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { router } from './router';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});