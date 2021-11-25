"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const postSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
    trim: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'comment',
    default: []
  }],
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true
});
const Post = (0, _mongoose.model)('post', postSchema);
var _default = Post;
exports.default = _default;