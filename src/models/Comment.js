/* eslint-disable indent */
import { Schema, model } from 'mongoose';

   const commentSchema = new Schema({
      text: {
         type: String,
         required: true,
         minlength: 1,
         maxlength: 150,
         trim: true,
      },

      date: {
         type: Date,
         default: Date.now
      },

      post: {
         type: Schema.Types.ObjectId,
         ref: 'post',
      },
      
      owner: { 
         type: Schema.Types.ObjectId,
         ref: 'user',
         required: true,
      }


   }, {
      timestamps: true,
   })

const Comment = model('comment', commentSchema);




export default Comment;
