"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _InvalidIdException = _interopRequireDefault(require("../exceptions/InvalidIdException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// usa o mongoose para fazer a validação da ID
const idValidation = id => {
  const isIdValid = _mongoose.default.isValidObjectId(id);

  if (!isIdValid) {
    throw new _InvalidIdException.default();
  }
};

var _default = idValidation;
exports.default = _default;