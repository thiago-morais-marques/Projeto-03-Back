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
const authService = new AuthService(authRepository);

const adminRoleMiddleware = (req, res, next) => {
  if (req.user.role === 'admin') {
    return next();
  }

  next(new NotAuthenticatedException('Unauthorized'));
}

router.get('/users', adminRoleMiddleware, async (req, res, next) => {
  try { 
    const { name } = req.query;
    const users = await authService.findAllUsers(name);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put('/block/:userId', adminRoleMiddleware, async (req, res, next) => {
  try {
    const { body } = req;
    const { userId } = req.params;
    const bockedUser = await authService.blockUser(userId, body);
    res.json(bockedUser);
  } catch (error) {
    next(error)
  }
});

router.delete('/ban', adminRoleMiddleware, async (req, res, next) => {
  try {  
    const deletedUser = await authService.deleteUser(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error)
  }
});

router.delete('/post', adminRoleMiddleware, async (req, res, next) => {
  try {  
    const deletedUser = await authService.deleteUser(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error)
  }
});

router.delete('/comment', adminRoleMiddleware, async (req, res, next) => {
  try {  
    const deletedUser = await authService.deleteUser(req.user.id);
    res.json(deletedUser);
  } catch (error) {
    next(error)
  }
});

export default router;
