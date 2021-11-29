import { Router } from 'express';

import User from '../models/User';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';

const router = Router();

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
    const { body } = req;
    const tokenReponse = await authService.authenticate(body);
    res.json(tokenReponse);
  } catch (error) {
    next(error);
  }
});

export default router;
