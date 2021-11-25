"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class EmailAlreadyInUseException extends Error {
  constructor() {
    super();
    this.status = 400;
    this.message = 'This email is already in use. Please choose another';
  }

}

var _default = EmailAlreadyInUseException;
exports.default = _default;