/* eslint-disable indent */
// import validateId from "../validation/mongooseId";
// import PostNotFoundException from '../exceptions/PostNotFoundException'


// class PostService {
//     constructor(postRepository) {
//         this.postRepository = postRepository;
        
//     }

//     async findAllTittleById(title = '', id) {
//         const post = await this.postRepository.findAllTittleById(title, id);
        
//         return post;
//     }

//     async create(body, id) {
//         await body.validate();

//         const postData = {
//             title: body.title,
//             description: body.description,
//             owner: id,
//         };

//         const newPost = await this.postRepository.create(postData);
//         return newPost;
//     }

//         async findOneByIdAndOwnerId(id, ownerId) {
//             validateId(id);
//         const posts = await this.postRepository.findOneByIdAndOwnerId(id, ownerId);

//         return posts;
//     }

//     async updateOnePost(id, ownerId, body) {
//         await body.validate();
//         validateId(id);

//        await validatePostExists(id, ownerId);

//         const postData = {
//             title: body.title, 
//             description: body.description,
//         }

//         const editedPost = await this.postRepository.updatePostById(id, postData);

//         return editedPost;
//     }

//     async deleteOne(id, ownerId) {
//         validateId(id);

//         await validatePostExists(id, ownerId);

//         await this.postRepository.deleteOneBId(id)

//         await this.postsRepository.Dele
//     }

//     async validetePostExists(id, ownerId) {
//         const post = await this.postRepository.findOneByIdAndOwnerId(id, ownerId);

//         if(!post) {
//             throw new PostNotFoundException();
//         }


//     }

// }


// class DeletePostRepository {
//     constructor(Model) {
//         this.Model;
//     }

//     async deleAllPostById(postId) {
//         await this.Model.deleteMany({ post: postId, comment: postId}); //validar na pasta models.
//     }

// }









// export default PostService;













////////////////////////////////////////////////




import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';
class PostsService {
  constructor(repository) {
    this.postRepository = repository;
  }
  
  async findAllTittleById(title = '', id) {
    const post = await this.postRepository.findAllTittleById(title, id);
    
    return post;
}

  async getAllByFilter(title = '', userId) {
    const posts = await this.postRepository.getAll(title, userId);
    return posts;
  }
  async getOne(id) {
    const post = await this.postRepository.getOne(id);
    return post;
  }
  async create(body, userId) {
    const schema = yup.object().shape({
      title: yup
      .string()
      .required('Required field')
      .min(1, 'Mimimum of one charracter')
      .max(150, 'Maximum of 150 charracters'),
    });
    try {
      await schema.validate(body, { abortEarly: false });
    } catch (error) {
      const errors = error.inner.map((err) => ({
        field: err.path,
        error: err.errors.length > 0 ? err.errors : err.errors[0],
      }));
      throw new InvalidBodyRequestException(errors);
    }
    const newPost = await this.postRepository.create(body, userId);
    return newPost;
  }
}
export default PostsService;









