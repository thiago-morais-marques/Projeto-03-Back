import { Router } from 'express';
import Post from '../models/Post';
import PostRepository from '../repository/postRepository';
import PostService from '../service/postService';
import Comment from '../models/Comment';
import CommentRepository from '../repository/commentRepository';
import CommentService from '../service/commentService';

const router = Router();

const commentRepository = new CommentRepository(Comment);
const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository, commentRepository);
const commentService = new CommentService(commentRepository, postRepository, postService);

router.put('/:userId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { body } = req;
    // console.log(commentId);
    // console.log(body);
    // console.log(req.user.id);
    const editedComment = await commentService.updateOne(commentId, req.user.id, body);
    res.status(200).json(editedComment);
  } catch (error) {
    next(error)
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    // console.log(commentId);
    // console.log(req.user.id);
    const deleteComment = await commentService.deleteOne(commentId, req.user.id);
    res.status(204).json(deleteComment);
  } catch (error) {
    next(error)
  }
});

export default router;


