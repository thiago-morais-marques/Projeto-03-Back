import { Router } from 'express';

import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';

const router = Router();

const postsRepository = new PostRepository(Post);
const postsService = new PostService(postsRepository);

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const newPost = await postsService.create(body, req.user.id);
    res.json(newPost);
  } catch (error) {
    next(error);
  }
});

export default router;
