// Rotas para ações do Admin/Moderador

import { Router } from 'express';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';
import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';
import Comment from '../models/Comment';
import CommentService from '../service/commentService';
import CommentRepository from '../repository/commentRepository';
import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';

const router = Router();

const authRepository = new AuthRepository(User);
const postRepository = new PostRepository(Post);
const commentRepository = new CommentRepository(Comment);
const authService = new AuthService(authRepository);
const postService = new PostService(postRepository);
const commentService = new CommentService(commentRepository);

// Middleware para validação do Admin
const adminRoleMiddleware = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }

  return next(new NotAuthenticatedException('Unauthorized'));
};

// Rota para listar todos os usuários
router.get('/users', adminRoleMiddleware, async (req, res, next) => {
  try {
    const { name } = req.query;
    const users = await authService.findAllUsers(name);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Rota para bloquear um usuário
router.put('/block/:userId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const { body } = req;
    const { userId } = req.params;
    const bockedUser = await authService.blockUser(userId, body);
    res.json(bockedUser);
  } catch (error) {
    next(error);
  }
});

// Rota para banir um usuário
router.delete('/ban/:userId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const bannedUser = await authService.deleteUserPostsAndComments(userId);
    res.json(bannedUser);
  } catch (error) {
    next(error);
  }
});

// Rota para o Admin deletar um post
router.delete('/post/:postId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const deletedPost = await postService.adminDeletePost(postId);
    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
});

// Rota para o Admin deletar um comentário
router.delete('/comment/:commentId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const deletedPost = await commentService.adminDeleteComment(postId);
    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
});

export default router;
