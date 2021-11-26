"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class NotAuthenticatedException extends Error {
  constructor(message) {
    super();
    this.status = 401;
    this.message = message;
  }

}

var _default = NotAuthenticatedException;
exports.default = _default;