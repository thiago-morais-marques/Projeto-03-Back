import { Router } from 'express';

import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';
import Comment from '../models/Comment';
import CommentService from '../service/commentService';
import CommentRepository from '../repository/commentRepository';


const router = Router();
const postRepository = new PostRepository(Post);
const commentRepository = new CommentRepository(Comment)
// const postService = new PostService(postRepository, commentRepository);
const commentService = new CommentService (commentRepository, postRepository)


router.get('/:postId', async (req, res, next) => {
    try {
     
      const { postId } = req.params;
      // const { id } = req.user;
      console.log(postId);
      const comments = await commentService.findAllByPostId(postId);
  
      res.json(comments);
    } catch (error) {
      next(error);
    }
  });
  
  



export default router;


