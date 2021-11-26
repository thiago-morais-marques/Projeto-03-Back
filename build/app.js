"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _postController = _interopRequireDefault(require("./controllers/postController"));

var _database = _interopRequireDefault(require("./configs/database"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cors from 'cors';
const app = (0, _express.default)();

_dotenv.default.config();

(0, _database.default)();
app.use(_express.default.json());
/* app.use(cors({
  origin: process.env.FRONT_END_URI,
})); // Liberando acesso SOMENTE para o localhost:3000!!! */

app.use((req, res, next) => {
  console.log(req.method, ' ', req.path);
  next(); // Deixe o request prosseguir para o próximo middleware
});
app.use('/api', _routes.default);
app.use((error, req, res, next) => {
  // Middleware UNICAMENTE responsável por receber requisições que possuam algum erro
  console.log(error);
  res.status(error.status || 500).json({
    error: error.message
  });
});
app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
app.get("/", (reqs, ress) => ress.json({
  message: 'HELLLLOOOOO'
}));
app.listen(5050, () => console.log('TESTEEEE'));