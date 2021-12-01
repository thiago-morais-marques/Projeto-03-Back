// Rotas de listagem de Posts

import { Router } from 'express';

import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';

const router = Router();

const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository);

// Rota de listagem de todos os Posts
router.get('/', async (req, res, next) => {
  try {
    const { title } = req.query;
    const posts = await postService.getAllByFilter(title);
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

// Rota de listagem de um único Post
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getOne(id);
    res.json(post);
  } catch (error) {
    next(error);
  }
});

export default router;
