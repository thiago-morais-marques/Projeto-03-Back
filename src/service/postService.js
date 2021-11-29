/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';
import InvalidOwnerException from '../exceptions/InvalidOwnerException';

class PostsService {
  constructor(repository) {
    this.postRepository = repository;
  }

  async validateOwnership(postId, ownerId) {
    const ownership = await this.postRepository.findOneByIdAndOwnerId(postId, ownerId);

    if (!ownership) {
      throw new InvalidOwnerException();
    }
  }

  async getAllByFilter(title = ''/* , userId */) {
    const posts = await this.postRepository.getAll(title/* , userId */);
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

  async updateOnePost(postId, ownerId, body) {
    
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

    await this.validateOwnership(postId, ownerId);

    const infoToUpdate = {
      title: body.title,
      text: body.text,
    }

    const editedPost = await this.postRepository.updatePostById(postId, infoToUpdate);

    return editedPost;
  }

  async deleteOne(postId) {
    await this.postRepository.deleteOneBId(postId);
  }
}

export default PostsService;
