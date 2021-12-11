"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em commentValidation, authValidation, editUserValidation e postValidation
class InvalidBodyRequestException extends Error {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }

}

var _default = InvalidBodyRequestException;
exports.default = _default;