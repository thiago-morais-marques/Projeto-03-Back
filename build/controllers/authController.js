"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("../models/User"));

var _authService = _interopRequireDefault(require("../service/authService"));

var _authRepository = _interopRequireDefault(require("../repository/authRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // Injeção de dependencias

const authRepository = new _authRepository.default(_User.default);
const authService = new _authService.default(authRepository);
router.post('/register', async (req, res, next) => {
  try {
    const {
      body
    } = req;
    const newUser = await authService.register(body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});
router.post('/login', async (req, res, next) => {
  try {
    // Receber o request e pegar somente o que será útil (req.body)
    const {
      body
    } = req; // Chamar o service passando o body para que ele aplique as regras de negócio

    const tokenReponse = await authService.authenticate(body); // Dar um response devolvendo o token para o usuário que a requisitou

    res.json(tokenReponse);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;