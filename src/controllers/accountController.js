import { Router } from 'express';
import AuthService from '../service/authService';
import AuthRepository from '../repository/authRepository';
import User from '../models/User';

const router = Router();
// const commentRepository = new CommentRepository(Comment);
// const postRepository = new PostRepository(Post);
// const postService = new PostService(postRepository, commentRepository);
// const commentService = new CommentService(commentRepository, postRepository, postService);
const authRepository = new AuthRepository(User);
const authService = new AuthService(authRepository);


router.put('/:userId', async (req, res, next) => {
  try {
    const { body } = req;
    const editedUser = await authService.editUser(req.user.id, body);
    res.json(editedUser);

  } catch (error) {
    next(error)
  }
});

router.delete('/:userId', async (req, res, next) => {
  try {  
    const deletedUser = await authService.deleteUser(req.user.id);
    res.json(deletedUser);

  } catch (error) {
    next(error)
  }
});

export default router;
