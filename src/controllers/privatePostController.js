// Rotas para criação, edição e deleção de Posts

import { Router } from 'express';

import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';
import User from '../models/User';
import AuthRepository from '../repository/authRepository';
import Comment from '../models/Comment';
import CommentRepository from '../repository/commentRepository';
import NotAuthenticatedException from '../exceptions/NotAuthenticatedException';

const router = Router();

const postsRepository = new PostRepository(Post);
const authRepository = new AuthRepository(User);
const commentRepository = new CommentRepository(Comment);
const postsService = new PostService(postsRepository, authRepository, commentRepository);

// Middleware para checar se o usuário está ativo ou inativo
const activeUserMiddleware = (req, res, next) => {
  if (req.user.active === true) {
    return next();
  }

  return next(new NotAuthenticatedException('Unauthorized'));
};

// Rota de Criação de Posts
router.post('/', activeUserMiddleware, async (req, res, next) => {
  try {
    const { body } = req;
    const newPost = await postsService.create(body, req.user.id);
    res.json(newPost);
  } catch (error) {
    next(error);
  }
});

// Rota de Edição de Posts
router.put('/:postId', activeUserMiddleware, async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { body } = req;
    const editedPost = await postsService.updateOnePost(postId, req.user.id, body);
    res.json(editedPost);
  } catch (error) {
    next(error);
  }
  });

// Rota de Deleção de Posts
router.delete('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const deletePost = await postsService.deleteOne(postId, req.user.id);
    res.json(deletePost);
  } catch (error) {
    next(error);
  }
});

export default router;
