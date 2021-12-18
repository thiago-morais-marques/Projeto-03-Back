// Modelo de Post para o banco de dados

import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 150,
    trim: true,
  },
  imageURL: {
    type: String,
  },
  tag: [{
    type: String,
    default: [],
  }],
  text: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comment',
    default: [],
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
}, {
  timestamps: true,
});

const Post = model('post', postSchema);

export default Post;
