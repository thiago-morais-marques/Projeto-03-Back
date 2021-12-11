"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _User = _interopRequireDefault(require("../models/User"));

var _authService = _interopRequireDefault(require("../service/authService"));

var _authRepository = _interopRequireDefault(require("../repository/authRepository"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _postService = _interopRequireDefault(require("../service/postService"));

var _postRepository = _interopRequireDefault(require("../repository/postRepository"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _commentService = _interopRequireDefault(require("../service/commentService"));

var _commentRepository = _interopRequireDefault(require("../repository/commentRepository"));

var _NotAuthenticatedException = _interopRequireDefault(require("../exceptions/NotAuthenticatedException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rotas para ações do Admin/Moderador
const router = (0, _express.Router)();
const authRepository = new _authRepository.default(_User.default);
const postRepository = new _postRepository.default(_Post.default);
const commentRepository = new _commentRepository.default(_Comment.default);
const authService = new _authService.default(authRepository, postRepository, commentRepository);
const postService = new _postService.default(postRepository, authRepository, commentRepository);
const commentService = new _commentService.default(commentRepository, postRepository, authRepository); // Middleware para validação do Admin

const adminRoleMiddleware = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }

  return next(new _NotAuthenticatedException.default('Unauthorized'));
}; // Rota para listar todos os usuários


router.get('/users', adminRoleMiddleware, async (req, res, next) => {
  try {
    const {
      name
    } = req.query;
    const users = await authService.findAllUsers(name);
    res.json(users);
  } catch (error) {
    next(error);
  }
}); // Rota para bloquear um usuário

router.put('/block/:userId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const {
      body
    } = req;
    const {
      userId
    } = req.params;
    const bockedUser = await authService.blockUser(userId, body);
    res.json(bockedUser);
  } catch (error) {
    next(error);
  }
}); // Rota para banir um usuário

router.delete('/ban/:userId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const {
      userId
    } = req.params;
    const bannedUser = await authService.deleteUserPostsAndComments(userId);
    res.json(bannedUser);
  } catch (error) {
    next(error);
  }
}); // Rota para o Admin deletar um post

router.delete('/post/:postId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const {
      postId
    } = req.params;
    const deletedPost = await postService.adminDeletePost(postId);
    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
}); // Rota para o Admin deletar um comentário

router.delete('/comment/:commentId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const {
      commentId
    } = req.params;
    const deletedComment = await commentService.adminDeleteComment(commentId);
    res.json(deletedComment);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;