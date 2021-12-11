"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _authController = _interopRequireDefault(require("./controllers/authController"));

var _adminController = _interopRequireDefault(require("./controllers/adminController"));

var _accountController = _interopRequireDefault(require("./controllers/accountController"));

var _privateCommentController = _interopRequireDefault(require("./controllers/privateCommentController"));

var _privatePostController = _interopRequireDefault(require("./controllers/privatePostController"));

var _publicCommentController = _interopRequireDefault(require("./controllers/publicCommentController"));

var _publicPostController = _interopRequireDefault(require("./controllers/publicPostController"));

var _NotAuthenticatedException = _interopRequireDefault(require("./exceptions/NotAuthenticatedException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Organiza as rotas públicas e privadas, além de criar middleware para verificar o token
const router = (0, _express.Router)(); // Rotas Públicas

router.use('/auth', _authController.default); // /api/auth

router.use('/posts', _publicPostController.default); // /api/posts

router.use('/comments', _publicCommentController.default); // /api/comments
// Middleware que verifica o token

router.use((req, res, next) => {
  const bearerToken = req.get('Authorization');

  if (!bearerToken) {
    return next(new _NotAuthenticatedException.default('Missing token'));
  }

  const token = bearerToken.slice(7);

  try {
    const tokenPayload = _jsonwebtoken.default.verify(token, process.env.TOKEN_SECRET);

    req.user = {
      id: tokenPayload.id,
      role: tokenPayload.role,
      active: tokenPayload.active
    };
    return next();
  } catch (error) {
    return next(new _NotAuthenticatedException.default('Token invalid or expired'));
  }
}); // Rotas Privadas

router.use('/posts', _privatePostController.default);
router.use('/comments', _privateCommentController.default);
router.use('/admin', _adminController.default);
router.use('/account', _accountController.default);
var _default = router;
exports.default = _default;