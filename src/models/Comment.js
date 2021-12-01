// Modelo de Comentários para o banco de dados

import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
   text: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
   },
   imageURL: {
      type: String,
      },
   date: {
      type: Date,
      default: Date.now,
   },
   post: {
      type: Schema.Types.ObjectId,
      ref: 'post',
   },
   owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      },
}, {
   timestamps: true,
});

const Comment = model('comment', commentSchema);

export default Comment;
