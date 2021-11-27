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


// router.post('/:postId', async (req, res, next) => {
//   try {
//     const { body } = req;
//     const { postId } = req.params;
//     const savedComment = await commentService.create(body, postId);
//     // Podemos movê-lo para o projectepository
//     res.status(201).json(savedComment);
//   } catch (error) {
//     next(error);
//   }
// });









export default router;
