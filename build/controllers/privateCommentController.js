"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Post = _interopRequireDefault(require("../models/Post"));

var _postRepository = _interopRequireDefault(require("../repository/postRepository"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _commentRepository = _interopRequireDefault(require("../repository/commentRepository"));

var _commentService = _interopRequireDefault(require("../service/commentService"));

var _User = _interopRequireDefault(require("../models/User"));

var _authRepository = _interopRequireDefault(require("../repository/authRepository"));

var _NotAuthenticatedException = _interopRequireDefault(require("../exceptions/NotAuthenticatedException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rotas para criação, edição e deleção de Comments
const router = (0, _express.Router)();
const commentRepository = new _commentRepository.default(_Comment.default);
const postRepository = new _postRepository.default(_Post.default);
const authRepository = new _authRepository.default(_User.default);
const commentService = new _commentService.default(commentRepository, postRepository, authRepository); // Middleware para checar se o usuário está ativo ou inativo

const activeUserMiddleware = (req, res, next) => {
  if (req.user.active === true) {
    return next();
  }

  return next(new _NotAuthenticatedException.default('Unauthorized'));
}; // Rota de Criação de Comment


router.post('/:postId', activeUserMiddleware, async (req, res, next) => {
  try {
    const {
      body
    } = req;
    const {
      postId
    } = req.params;
    const savedComment = await commentService.create(body, postId, req.user.id);
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
}); // Rota de Edição de Comment

router.put('/:commentId', activeUserMiddleware, async (req, res, next) => {
  try {
    const {
      commentId
    } = req.params;
    const {
      body
    } = req;
    const editedComment = await commentService.updateOne(commentId, req.user.id, body);
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
}); // Rota de Deleção de Comment

router.delete('/:commentId', async (req, res, next) => {
  try {
    const {
      commentId
    } = req.params;
    const deleteComment = await commentService.deleteOne(commentId, req.user.id);
    res.status(204).json(deleteComment);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;