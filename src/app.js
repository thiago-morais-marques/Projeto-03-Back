/* eslint-disable no-unused-vars */
// o app inicia por este arquivo

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import initDbConnection from './configs/database';
import appRoutes from './routes';

const app = express();
dotenv.config();

initDbConnection();

app.use(express.json({ limit: '50mb' }));

app.use(cors({
  origin: process.env.FRONT_END_URI,
}));

app.use((req, res, next) => {
  console.log(req.method, ' ', req.path);
  next();
});

app.use('/api', appRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({ error: error.message });
});

app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
