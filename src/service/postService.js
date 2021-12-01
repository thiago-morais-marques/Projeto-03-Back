import InvalidOwnerException from '../exceptions/InvalidOwnerException';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import idValidation from '../validation/idValidation';
import postValidation from '../validation/postValidation';

class PostService {
  constructor(postRepository, authRepository, commentRepository) {
    this.postRepository = postRepository;
    this.authRepository = authRepository;
    this.commentRepository = commentRepository;
  }

  async validateOwnership(postId, ownerId) {
    const ownership = await this.postRepository.findOneByIdAndOwnerId(postId, ownerId);
    if (!ownership) {
      throw new InvalidOwnerException();
    }
  }

  async findPostIdAndValidateOwnership(postId, ownerId) {
    const post = await this.postRepository.findByPostId(postId);
    if (!post) {
      throw new PostNotFoundException();
    }
    await this.validateOwnership(postId, ownerId);
    return post;
  }

  async getAllByFilter(title = '') {
    const posts = await this.postRepository.getAll(title);
    return posts;
  }

  async getOne(id) {
    idValidation(id);
    const post = await this.postRepository.getOne(id);
    return post;
  }

  async create(body, userId) {
    await postValidation(body);
    const newPost = await this.postRepository.create(body, userId);
      await this.authRepository.insertPostIntoUserProfile(userId, newPost._id);
    return newPost;
  }

  async updateOnePost(postId, ownerId, body) {
    idValidation(postId);
    await postValidation(body);
    await this.validateOwnership(postId, ownerId);
    const infoToUpdate = { title: body.title, text: body.text };
    const editedPost = await this.postRepository.updatePostById(postId, infoToUpdate);
    return editedPost;
  }

  async deleteOne(postId, ownerId) {
    idValidation(postId);
    await this.validateOwnership(postId, ownerId);
    const deletePost = await this.postRepository.deleteOneById(postId);
    await this.authRepository.removePostFromUserProfile(ownerId, postId);
    await this.commentRepository.deleteAll(postId);
    return deletePost;
  }

  async adminDeletePost(postId) {
    idValidation(postId);
    const deletedPost = await this.postRepository.deleteOneById(postId);
    const postOwner = { owner: deletedPost.owner };
    await this.authRepository.removePostFromUserProfile(postOwner, postId);
    await this.commentRepository.deleteAll(postId);
    return deletedPost;
  }
}

export default PostService;
