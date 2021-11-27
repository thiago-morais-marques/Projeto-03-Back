import { Router } from 'express';
import CommentService from '../service/commentService';
import Post from '../models/Post';
import Comment from '../models/Comment';
import CommentRepository from '../repository/commentRepository';
import PostRepository from '../repository/postRepository';
import postService from '../service/postService';
// Injeção de Dependencias
const commentRepository = new CommentRepository(Comment);
const postRepository = new PostRepository(Post);
const commentService = new CommentService(commentRepository, postRepository);
const router = Router();


router.post('/:postId', async (req, res, next) => {
  try {
    const { body } = req;
    const { postId } = req.params;
    const savedComment = await commentService.create(body, postId);
    // Podemos movê-lo para o projectepository
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});






export default router;
