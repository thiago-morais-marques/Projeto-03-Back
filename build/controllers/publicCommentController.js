"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Post = _interopRequireDefault(require("../models/Post"));

var _postRepository = _interopRequireDefault(require("../repository/postRepository"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _commentService = _interopRequireDefault(require("../service/commentService"));

var _commentRepository = _interopRequireDefault(require("../repository/commentRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rotas de listagem de comentários
const router = (0, _express.Router)();
const postRepository = new _postRepository.default(_Post.default);
const commentRepository = new _commentRepository.default(_Comment.default);
const commentService = new _commentService.default(commentRepository, postRepository); // Rota de listagem de commentários em um Post

router.get('/:postId', async (req, res, next) => {
  try {
    const {
      postId
    } = req.params;
    const comments = await commentService.findAllByPostId(postId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;