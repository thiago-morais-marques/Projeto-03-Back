// Rotas para criação, edição e deleção de Comments

import { Router } from 'express';

import Post from '../models/Post';
import PostRepository from '../repository/postRepository';
import Comment from '../models/Comment';
import CommentRepository from '../repository/commentRepository';
import CommentService from '../service/commentService';
import User from '../models/User';
import AuthRepository from '../repository/authRepository';
import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';

const router = Router();

const commentRepository = new CommentRepository(Comment);
const postRepository = new PostRepository(Post);
const authRepository = new AuthRepository(User);
const commentService = new CommentService(commentRepository, postRepository, authRepository);

// Middleware para checar se o usuário está ativo ou inativo
const activeUserMiddleware = (req, res, next) => {
  if (req.user.active === true) {
    return next();
  }

  return next(new NotAuthenticatedException('Unauthorized'));
};

// Rota de Criação de Comment
router.post('/:postId', activeUserMiddleware, async (req, res, next) => {
  try {
    const { body } = req;
    const { postId } = req.params;
    const savedComment = await commentService.create(body, postId, req.user.id);
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
});

// Rota de Edição de Comment
router.put('/:commentId', activeUserMiddleware, async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { body } = req;
    const editedComment = await commentService.updateOne(commentId, req.user.id, body);
    res.status(200).json(editedComment);
  } catch (error) {
    next(error);
  }
});

// Rota de Deleção de Comment
router.delete('/:commentId', async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deleteComment = await commentService.deleteOne(commentId, req.user.id);
    res.status(204).json(deleteComment);
  } catch (error) {
    next(error);
  }
});

export default router;
