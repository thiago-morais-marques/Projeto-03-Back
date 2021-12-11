"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em idValidation
class InvalidIdException extends Error {
  constructor() {
    super();
    this.status = 400;
    this.message = 'Invalid Id informed';
  }

}

var _default = InvalidIdException;
exports.default = _default;