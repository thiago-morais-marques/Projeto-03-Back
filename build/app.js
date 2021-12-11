"use strict";

var _express = _interopRequireDefault(require("express"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _database = _interopRequireDefault(require("./configs/database"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-unused-vars */
// o app inicia por este arquivo
const app = (0, _express.default)();

_dotenv.default.config();

(0, _database.default)();
app.use(_express.default.json());
app.use((0, _cors.default)({
  origin: process.env.FRONT_END_URI
}));
app.use((req, res, next) => {
  console.log(req.method, ' ', req.path);
  next();
});
app.use('/api', _routes.default);
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    error: error.message
  });
});
app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));