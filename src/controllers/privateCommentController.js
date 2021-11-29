import { Router } from 'express';

import Post from '../models/Post';
import PostRepository from '../repository/postRepository';
// import postService from '../service/postService';
import Comment from '../models/Comment';
import CommentRepository from '../repository/commentRepository';
import CommentService from '../service/commentService';

const router = Router();

const commentRepository = new CommentRepository(Comment);
const postRepository = new PostRepository(Post);
const commentService = new CommentService(commentRepository, postRepository);

router.post('/:postId', async (req, res, next) => {
  try {
    const { body } = req;
    const { postId } = req.params;

    console.log(body);
    console.log(postId);
    console.log(req.user.id)

    const savedComment = await commentService.create(body, postId, req.user.id);
    // Podemos movê-lo para o projectepository
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

export default router;
