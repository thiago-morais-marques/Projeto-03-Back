/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

class PostsService {
  constructor(repository) {
    this.postRepository = repository;
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

  async updateOnePost(body, postId) {
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

    const infoToUpdate = {
      title: body.title,
      text: body.text,
    }

    console.log(infoToUpdate);

    const editedPost = await this.postRepository.updatePostById(postId, infoToUpdate);

    return editedPost;
  }

  async deleteOne(postId) {
          await this.postRepository.deleteOneBId(postId);
  }
    
}

export default PostsService;
