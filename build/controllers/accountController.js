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

var _postRepository = _interopRequireDefault(require("../repository/postRepository"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _commentRepository = _interopRequireDefault(require("../repository/commentRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rotas para serem usadas em página de profile de usuário
const router = (0, _express.Router)();
const authRepository = new _authRepository.default(_User.default);
const postRepository = new _postRepository.default(_Post.default);
const commentRepository = new _commentRepository.default(_Comment.default);
const authService = new _authService.default(authRepository, postRepository, commentRepository); // Edita conta do usuário

router.put('/edit', async (req, res, next) => {
  try {
    const {
      body
    } = req;
    console.log(req.user.active);
    const editedUser = await authService.editUser(req.user.id, body);
    res.json(editedUser);
  } catch (error) {
    next(error);
  }
}); // Deleta a conta do usuário, mas mantêm posts e comentários

router.delete('/delete', async (req, res, next) => {
  try {
    const deletedUser = await authService.deleteUser(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
}); // Deleta a conta do usuário e apaga posts e comentários

router.delete('/delete-everything', async (req, res, next) => {
  try {
    const deletedUser = await authService.deleteUserPostsAndComments(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;