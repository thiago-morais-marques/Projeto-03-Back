"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _authController = _interopRequireDefault(require("./controllers/authController"));

var _NotAuthenticatedException = _interopRequireDefault(require("./exceptions/NotAuthenticatedException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import postsController from './controllers/postsController';
//import commentsController from './controllers/commentsController';
const router = (0, _express.Router)(); // Rotas Públicas

router.use('/auth', _authController.default); // /api/auth
// Criar AQUI um middleware que verifica as credenciais do nosso user

router.use((req, res, next) => {
  // AQUI VAMOS RECEBER O ACCESS TOKEN E VALIDA-LO PARA AUTORIZAR O CLIENT A VER OS SEUS PROJETOS
  const bearerToken = req.get('Authorization'); // Se foi passado este header

  if (!bearerToken) {
    return next(new _NotAuthenticatedException.default('Missing token'));
  } // validar o token


  const token = bearerToken.slice(7);

  try {
    const tokenPayload = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    req.user = {
      id: tokenPayload.id,
      role: tokenPayload.role
    };
    return next();
  } catch (error) {
    return next(new _NotAuthenticatedException.default('Token invalid or expired'));
  }
}); // Rotas Privadas
//router.use('/posts', postsController); // /api/posts
//router.use('/admin-comments', commentsController); // /api/admin-comments

var _default = router;
exports.default = _default;