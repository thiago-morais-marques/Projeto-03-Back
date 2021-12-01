// Organiza as rotas públicas e privadas, além de criar middleware para verificar o token

import { Router } from 'express';
import jwt from 'jsonwebtoken';

import authController from './controllers/authController';
import adminController from './controllers/adminController';
import accountController from './controllers/accountController';
import privateCommentController from './controllers/privateCommentController';
import privatePostController from './controllers/privatePostController';
import publicCommentController from './controllers/publicCommentController';
import publicPostController from './controllers/publicPostController';
import NotAuthenticatedException from './exceptions/NotAuthenticatedException';

const router = Router();

// Rotas Públicas
router.use('/auth', authController); // /api/auth
router.use('/posts', publicPostController); // /api/posts
router.use('/comments', publicCommentController); // /api/comments

// Middleware que verifica o token
router.use((req, res, next) => {
  const bearerToken = req.get('Authorization');
  if (!bearerToken) {
    return next(new NotAuthenticatedException('Missing token'));
  }

  const token = bearerToken.slice(7);

  try {
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: tokenPayload.id, role: tokenPayload.role, active: tokenPayload.active };

    return next();
  } catch (error) {
    return next(new NotAuthenticatedException('Token invalid or expired'));
  }
});

// Rotas Privadas
router.use('/posts', privatePostController);
router.use('/comments', privateCommentController);
router.use('/admin', adminController);
router.use('/account', accountController);

export default router;
