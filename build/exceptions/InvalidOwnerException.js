"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em postService e em commentService
class InvalidOwnerException extends Error {
  constructor() {
    super();
    this.message = 'Invalid Owner';
    this.status = 400;
  }

}

var _default = InvalidOwnerException;
exports.default = _default;