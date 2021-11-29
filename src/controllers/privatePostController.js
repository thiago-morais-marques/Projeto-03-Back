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

router.put('/:postId', async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { body } = req;

      /* console.log(postId);
      console.log(body);
      console.log(req.user.id); */
  
      const editedPost = await postsService.updateOnePost(postId, req.user.id, body);
  
      res.json(editedPost);
    } catch (error) {
      next(error)
    }
  });

router.delete('/:postId', async (req, res, next) => {
try {
    const { postId } = req.params;
    // const { id } = req.user;

    // console.log(postId);
    // console.log(id);

    const deletePost = await postsService.deleteOne(postId);

    res.json(deletePost);
} catch (error) {
    next(error)
}
});

export default router;
