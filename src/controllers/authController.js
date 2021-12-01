// Rotas para criar usuário e fazer login

import { Router } from 'express';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

const router = Router();

const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);

// Rota para criação de usuário
router.post('/register', async (req, res, next) => {
  try {
    const { body } = req;
    const newUser = await authService.register(body);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

// Rota para login de usuário
router.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const tokenReponse = await authService.authenticate(body);
    res.json(tokenReponse);
  } catch (error) {
    next(error);
  }
});

// Rota para listar usuários.
// Apenas para teste no Insomnia! Não será usada no Front
router.get('/', async (req, res, next) => {
  try {
    const { name } = req.query;
    const users = await authService.findAllUsers(name);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
