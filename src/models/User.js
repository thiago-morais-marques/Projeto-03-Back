import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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
    type: Schema.Types.ObjectId, 
    ref: 'posts', 
    default: [] 
  }],
}, {
    timestamps: true,
});
  
const User = model('user', userSchema);
  
export default User;
  