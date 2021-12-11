"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em authService
class InvalidCredentialsException extends Error {
  constructor() {
    super();
    this.status = 400;
    this.message = 'Email or password does not match';
  }

}

var _default = InvalidCredentialsException;
exports.default = _default;