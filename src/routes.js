import { Router } from 'express';
import jwt from 'jsonwebtoken';

import getPostController from './controllers/getPostController';
import authController from './controllers/authController';
import createPostController from './controllers/createPostController';
import updatePostController from './controllers/updatePostController';

//import commentsController from './controllers/commentsController';

import NotAuthenticatedException from './exceptions/NotAuthenticatedException';

const router = Router();

// Rotas Públicas
router.use('/posts', getPostController); // /api/posts
router.use('/auth', authController); // /api/auth
router.use((req, res, next) => {
  const bearerToken = req.get('Authorization');
  if (!bearerToken) {
    return next(new NotAuthenticatedException('Missing token'));
  }

  const token = bearerToken.slice(7);

  try {
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: tokenPayload.id, role: tokenPayload.role };

    return next();
  } catch (error) {
    return next(new NotAuthenticatedException('Token invalid or expired'));
  }
});

// Rotas Privadas
router.use('/create-posts', createPostController); // /api/create-posts
router.use('/posts', updatePostController); // /api/update-posts
//router.use('/admin-comments', commentsController); // /api/admin-comments

export default router;