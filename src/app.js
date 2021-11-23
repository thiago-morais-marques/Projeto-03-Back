import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';

import initDbConnection from './configs/database';
import appRoutes from './routes';

const app = express();
dotenv.config();

initDbConnection();

app.use(express.json());
/* app.use(cors({
  origin: process.env.FRONT_END_URI,
})); // Liberando acesso SOMENTE para o localhost:3000!!! */

app.use((req, res, next) => {
  console.log(req.method, ' ', req.path);

  next(); // Deixe o request prosseguir para o próximo middleware
});

app.use('/api', appRoutes);

app.use((error, req, res, next) => {
  // Middleware UNICAMENTE responsável por receber requisições que possuam algum erro
  console.log(error);
  res.status(error.status || 500).json({ error: error.message });
});

app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
