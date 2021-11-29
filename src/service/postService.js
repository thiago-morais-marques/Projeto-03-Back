import InvalidOwnerException from '../exceptions/InvalidOwnerException';
import { postValidation } from '../validation/postValidation';
class PostService {
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
    await postValidation(body);
    const newPost = await this.postRepository.create(body, userId);
    return newPost;
  }

  async updateOnePost(postId, ownerId, body) {
    await postValidation(body);
    await this.validateOwnership(postId, ownerId);
    const infoToUpdate = { title: body.title, text: body.text }
    const editedPost = await this.postRepository.updatePostById(postId, infoToUpdate);
    return editedPost;
  }

  async deleteOne(postId, ownerId) {
    await this.validateOwnership(postId, ownerId);
    await this.postRepository.deleteOneById(postId);
  }
}

export default PostService;
