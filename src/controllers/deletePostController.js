// // // // 
import { Router } from 'express';

import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';

const router = Router();

const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository);

router.delete('/:postId', async (req, res, next) => {
  try {
    const { postId } = req.params;
    // const { id } = req.user;

    console.log(postId);
    // console.log(id);

    const deletePost = await postService.deleteOne(postId);

    res.json(deletePost);
  } catch (error) {
        next(error)
  }
});

export default router;
