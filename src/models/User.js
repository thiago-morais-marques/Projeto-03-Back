// Modelo de usuário para o banco de dados

import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 15,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'posts',
    default: [],
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment',
    default: [],
  }],
}, {
    timestamps: true,
});

const User = model('user', userSchema);

export default User;
