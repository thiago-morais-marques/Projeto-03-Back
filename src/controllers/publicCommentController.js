// Rotas de listagem de comentários

import { Router } from 'express';

import Post from '../models/Post';
import PostRepository from '../repository/postRepository';
import Comment from '../models/Comment';
import CommentService from '../service/commentService';
import CommentRepository from '../repository/commentRepository';

const router = Router();

const postRepository = new PostRepository(Post);
const commentRepository = new CommentRepository(Comment);
const commentService = new CommentService(commentRepository, postRepository);

// Rota de listagem de commentários em um Post
router.get('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await commentService.findAllByPostId(postId);
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

export default router;
