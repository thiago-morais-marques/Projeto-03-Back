"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em adminController e routes
class NotAuthenticatedException extends Error {
  constructor(message) {
    super();
    this.status = 401;
    this.message = message;
  }

}

var _default = NotAuthenticatedException;
exports.default = _default;