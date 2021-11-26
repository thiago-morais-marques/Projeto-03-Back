/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable indent */
import { Router } from 'express';
import Post from '../models/Post';
import PostService from '../service/postService';
import PostRepository from '../repository/postRepository';
// import CreatePostRequestDTO from '../dtos/CreatePostRequestDTO'
// import EditPostRequestDTO from '../dtos/EditPostRequestDTO'
import DeletePostRepository from '../repository/deleteRepository';


const postRepository = new PostRepository(Post);
const postService = new PostService(postRepository); //injeção de dependências

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const { title } = req.query;
        const { id } = req.user;

        const post = await postService.findAllTittleById(title, id);

    res.json({post})
    } catch (error) {
        next(error)
    }
});

//lógica para o dono do post
router.get('/:postId', async (req, res, next) => { 
    try {
        const { id } = req.user;
        const { postId } = req.params;

        const posts = await postService.findOneByIdAndOwnerId(postId, id)

        res.json(posts)
    } catch (error) {
        next(error)
    }
})


// router.post('/', async (req, res, next) => {
    // try {
        
        // const { id } = req.user;
        // const body = new CreatePostRequestDTO(req.body);

        // const newPost = await postService.create(body, id)

        // res.status(201).json(newPost);
    // } catch (error) {
        // next(error);
    // }
// });




router.post('/', async (req, res, next) => {
    try {
      const { body } = req;
      const newPost = await postService.create(body, req.user.id);
      res.json(newPost);
    } catch (error) {
      next(error);
    }
  });

// router.put('/:postId', async (req, res, next) => {
//     try {
//         const { id } = req.user;
//         const { postId } = req.params;
//         const body = new EditPostRequestDTO(req.body);

//         const editedPost = await postService.updateOnePost(postId, id, body);

//         res.json(editedPost);
//     } catch (error) {
//         next(error)
//     }
// })

// router.delete('/:postId', (req, res, next) => {
//     const { id } = req.user;
//     const { postId } = req.params;
    

//     const deletePost = await DeletePostRepository.DeletePostRepository(postId, id);
    
//     res.status(204).json()
// })




export default router;