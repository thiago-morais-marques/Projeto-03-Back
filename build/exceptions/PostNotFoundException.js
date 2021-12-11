"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em postService
class PostNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Post not found';
    this.status = 400;
  }

}

var _default = PostNotFoundException;
exports.default = _default;