"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

// Modelo de usuário para o banco de dados
const userSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin']
  },
  active: {
    type: Boolean,
    default: true
  },
  posts: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'posts',
    default: []
  }],
  comments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'comment',
    default: []
  }],
  profilePicture: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
const User = (0, _mongoose.model)('user', userSchema);
var _default = User;
exports.default = _default;