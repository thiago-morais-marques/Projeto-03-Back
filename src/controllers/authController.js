import { Router } from 'express';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

const router = Router();

// Injeção de dependencias
const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);

router.post('/register', async (req, res, next) => {
  try {
    const { body } = req;

    const newUser = await authService.register(body);

    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    // Receber o request e pegar somente o que será útil (req.body)
    const { body } = req;
    // Chamar o service passando o body para que ele aplique as regras de negócio
    const tokenReponse = await authService.authenticate(body);
    // Dar um response devolvendo o token para o usuário que a requisitou
    res.json(tokenReponse);
  } catch (error) {
    next(error);
  }
});

export default router;
