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

// Rotas para criar usuário e fazer login
const router = (0, _express.Router)();
const authRepository = new _authRepository.default(_User.default);
const authService = new _authService.default(authRepository); // Rota para criação de usuário

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
}); // Rota para login de usuário

router.post('/login', async (req, res, next) => {
  try {
    const {
      body
    } = req;
    const tokenReponse = await authService.authenticate(body);
    res.json(tokenReponse);
  } catch (error) {
    next(error);
  }
}); // Rota para listar usuários.
// Apenas para teste no Insomnia! Não será usada no Front

router.get('/', async (req, res, next) => {
  try {
    const {
      name
    } = req.query;
    const users = await authService.findAllUsers(name);
    res.json(users);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;