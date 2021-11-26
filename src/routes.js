import { Router } from 'express';
import jwt from 'jsonwebtoken';
import authController from './controllers/authController';
import postController from './controllers/postController';
// import commentsController from './controllers/commentsController';
import NotAuthenticatedException from './exceptions/NotAuthenticatedException';

const router = Router();

// Rotas Públicas
router.use('/posts', postController); // /api/posts
router.use('/auth', authController); // /api/auth

// router.use('/postController', postController); // /api/postController


// Criar AQUI um middleware que verifica as credenciais do nosso user
router.use((req, res, next) => {
  // AQUI VAMOS RECEBER O ACCESS TOKEN E VALIDA-LO PARA AUTORIZAR O CLIENT A VER OS SEUS PROJETOS
  const bearerToken = req.get('Authorization');

  // Se foi passado este header
  if (!bearerToken) {
    return next(new NotAuthenticatedException('Missing token'));
  }

  // validar o token
  const token = bearerToken.slice(7);

  try {
    const tokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = { id: tokenPayload.id, role: tokenPayload.role };

    return next();
  } catch (error) {
    return next(new NotAuthenticatedException('Token invalid or expired'));
  }
});


router.use('/create-posts', postController); // /api/posts




// Rotas Privadas
// router.use('/posts', postController); // /api/posts
//router.use('/admin-comments', commentsController); // /api/admin-comments

export default router;