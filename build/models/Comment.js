"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const commentSchema = new _mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  post: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }
}, {
  timestamps: true
});
const Comment = (0, _mongoose.model)('comment', commentSchema);
var _default = Comment;
exports.default = _default;