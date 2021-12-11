"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Post = _interopRequireDefault(require("../models/Post"));

var _postService = _interopRequireDefault(require("../service/postService"));

var _postRepository = _interopRequireDefault(require("../repository/postRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Rotas de listagem de Posts
const router = (0, _express.Router)();
const postRepository = new _postRepository.default(_Post.default);
const postService = new _postService.default(postRepository); // Rota de listagem de todos os Posts

router.get('/', async (req, res, next) => {
  try {
    const {
      title
    } = req.query;
    const posts = await postService.getAllByFilter(title);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}); // Rota de listagem de um único Post

router.get('/:id', async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    const post = await postService.getOne(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;