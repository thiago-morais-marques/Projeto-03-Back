// Rotas para serem usadas em página de profile de usuário

import { Router } from 'express';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';
import Post from '../models/Post';
import PostRepository from '../repository/postRepository';
import Comment from '../models/Comment';
import CommentRepository from '../repository/commentRepository';

const router = Router();

const authRepository = new AuthRepository(User);
const postRepository = new PostRepository(Post);
const commentRepository = new CommentRepository(Comment);
const authService = new AuthService(authRepository, postRepository, commentRepository);

// Edita conta do usuário
router.put('/edit', async (req, res, next) => {
  try {
    const { body } = req;
    console.log(req.user.active);
    const editedUser = await authService.editUser(req.user.id, body);
    res.json(editedUser);
  } catch (error) {
    next(error);
  }
});

// Deleta a conta do usuário, mas mantêm posts e comentários
router.delete('/delete', async (req, res, next) => {
  try {
    const deletedUser = await authService.deleteUser(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});

// Deleta a conta do usuário e apaga posts e comentários
router.delete('/delete-everything', async (req, res, next) => {
  try {
    const deletedUser = await authService.deleteUserPostsAndComments(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
});

export default router;
