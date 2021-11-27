import { Router } from 'express';

import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';

const router = Router();

const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository);

router.put('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { body } = req;

    console.log(postId);
    console.log(body);

    const editedPost = await postService.updateOnePost(body, postId);

    res.json(editedPost);
  } catch (error) {
        next(error)
  }
});

export default router;