"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Post = _interopRequireDefault(require("../models/Post"));

var _postService = _interopRequireDefault(require("../service/postService"));

var _postRepository = _interopRequireDefault(require("../repository/postRepository"));

var _User = _interopRequireDefault(require("../models/User"));

var _authRepository = _interopRequireDefault(require("../repository/authRepository"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _commentRepository = _interopRequireDefault(require("../repository/commentRepository"));

var _NotAuthenticatedException = _interopRequireDefault(require("../exceptions/NotAuthenticatedException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rotas para criação, edição e deleção de Posts
const router = (0, _express.Router)();
const postsRepository = new _postRepository.default(_Post.default);
const authRepository = new _authRepository.default(_User.default);
const commentRepository = new _commentRepository.default(_Comment.default);
const postsService = new _postService.default(postsRepository, authRepository, commentRepository); // Middleware para checar se o usuário está ativo ou inativo

const activeUserMiddleware = (req, res, next) => {
  if (req.user.active === true) {
    return next();
  }

  return next(new _NotAuthenticatedException.default('Unauthorized'));
}; // Rota de Criação de Posts


router.post('/', activeUserMiddleware, async (req, res, next) => {
  try {
    const {
      body
    } = req;
    const newPost = await postsService.create(body, req.user.id);
    res.json(newPost);
  } catch (error) {
    next(error);
  }
}); // Rota de Edição de Posts

router.put('/:postId', activeUserMiddleware, async (req, res, next) => {
  try {
    const {
      postId
    } = req.params;
    const {
      body
    } = req;
    const editedPost = await postsService.updateOnePost(postId, req.user.id, body);
    res.json(editedPost);
  } catch (error) {
    next(error);
  }
}); // Rota de Deleção de Posts

router.delete('/:postId', async (req, res, next) => {
  try {
    const {
      postId
    } = req.params;
    const deletePost = await postsService.deleteOne(postId, req.user.id);
    res.json(deletePost);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;