"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

// Modelo de Post para o banco de dados
const postSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
    trim: true
  },
  imageURL: {
    type: String,
    required: true
  },
  tag: [{
    type: String,
    default: []
  }],
  text: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
    trim: true
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