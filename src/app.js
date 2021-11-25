import express from 'express';
import dotenv from 'dotenv';
// import cors from 'cors';
// import postController from './controllers/postController'
import initDbConnection from './configs/database';
import appRoutes from './routes';

dotenv.config();
const app = express();

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

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  // Middleware UNICAMENTE responsável por receber requisições que possuam algum erro
  console.log(error);
  res.status(error.status || 500).json({ error: error.message });
});

app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));

// eslint-disable-next-line no-multiple-empty-lines

// app.post("/", (req, res) => res.json ({message: 'HELLLLOOOOO'}));

// app.listen(8080, () => console.log('TESTEEEE'))
