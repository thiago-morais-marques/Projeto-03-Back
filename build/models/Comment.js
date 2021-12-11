"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

// Modelo de Comentários para o banco de dados
const commentSchema = new _mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 500,
    trim: true
  },
  imageURL: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true
});
const Comment = (0, _mongoose.model)('comment', commentSchema);
var _default = Comment;
exports.default = _default;