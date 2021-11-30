import { Router } from 'express';

import Post from '../models/Post';
import PostRepository from '../repository/postRepository';
// import PostService from '../service/postService';
import Comment from '../models/Comment';
import CommentRepository from '../repository/commentRepository';
import CommentService from '../service/commentService';

const router = Router();

const commentRepository = new CommentRepository(Comment);
const postRepository = new PostRepository(Post);
// const postService = new PostService(postRepository, commentRepository);
const commentService = new CommentService(commentRepository, postRepository/* , postService */);

router.post('/:postId', async (req, res, next) => {
  try {
    const { body } = req;
    const { postId } = req.params;
    const savedComment = await commentService.create(body, postId, req.user.id);
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

router.put('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { body } = req;
    console.log(body);
    const editedComment = await commentService.updateOne(commentId, req.user.id, body);
    res.status(200).json(editedComment);
  } catch (error) {
    next(error)
  }
});

router.delete('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deleteComment = await commentService.deleteOne(commentId, req.user.id);
    res.status(204).json(deleteComment);
  } catch (error) {
    next(error)
  }
});

export default router;
