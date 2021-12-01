// Modelo de Post para o banco de dados

import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 300,
    trim: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
  tag: [{
    type: String,
    default: [],
  }],
  text: {
    type: String,
    required: true,
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
