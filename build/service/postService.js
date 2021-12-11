"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _InvalidOwnerException = _interopRequireDefault(require("../exceptions/InvalidOwnerException"));

var _PostNotFoundException = _interopRequireDefault(require("../exceptions/PostNotFoundException"));

var _idValidation = _interopRequireDefault(require("../validation/idValidation"));

var _postValidation = _interopRequireDefault(require("../validation/postValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Classe que faz validações e cria métodos para serem usados no controller
class PostService {
  constructor(postRepository, authRepository, commentRepository) {
    this.postRepository = postRepository;
    this.authRepository = authRepository;
    this.commentRepository = commentRepository;
  } // verifica a titularidade de um post


  async validateOwnership(postId, ownerId) {
    const ownership = await this.postRepository.findOneByIdAndOwnerId(postId, ownerId);

    if (!ownership) {
      throw new _InvalidOwnerException.default();
    }
  } // encontra um post pelo ID e verifica sua titularidade


  async findPostIdAndValidateOwnership(postId, ownerId) {
    const post = await this.postRepository.getOne(postId);

    if (!post) {
      throw new _PostNotFoundException.default();
    }

    await this.validateOwnership(postId, ownerId);
    return post;
  } // lista todos os posts de acordo com o título


  async getAllByFilter(title = '') {
    const posts = await this.postRepository.getAll(title);
    return posts;
  } // lista apenas um post de acordo com o ID passado


  async getOne(id) {
    (0, _idValidation.default)(id);
    const post = await this.postRepository.getOne(id);
    return post;
  } // cria um post


  async create(body, userId) {
    await (0, _postValidation.default)(body);
    const newPost = await this.postRepository.create(body, userId);
    await this.authRepository.insertPostIntoUserProfile(userId, newPost._id);
    return newPost;
  } // método para o usuário atualizar as informações de um post


  async updateOnePost(postId, ownerId, body) {
    (0, _idValidation.default)(postId);
    await (0, _postValidation.default)(body);
    await this.findPostIdAndValidateOwnership(postId, ownerId);
    const infoToUpdate = {
      title: body.title,
      text: body.text
    };
    const editedPost = await this.postRepository.updatePostById(postId, infoToUpdate);
    return editedPost;
  } // método para o usuário deletar um post


  async deleteOne(postId, ownerId) {
    (0, _idValidation.default)(postId);
    await this.findPostIdAndValidateOwnership(postId, ownerId);
    const foundComments = await this.commentRepository.findAllByPostId(postId);
    const promises = foundComments.map(e => {
      return this.authRepository.removeCommentFromUserProfile(e.owner, e.id);
    });
    await Promise.all(promises);
    const deletePost = await this.postRepository.deleteOneById(postId);
    await this.authRepository.removePostFromUserProfile(ownerId, postId);
    await this.commentRepository.deleteAll(postId);
    return deletePost;
  } // método para o Admin deletar qualquer post


  async adminDeletePost(postId) {
    (0, _idValidation.default)(postId);
    const foundComments = await this.commentRepository.findAllByPostId(postId);
    const promises = foundComments.map(e => {
      return this.authRepository.removeCommentFromUserProfile(e.owner, e.id);
    });
    await Promise.all(promises);
    const getOnePost = await this.postRepository.getOne(postId);
    const deletedPost = await this.postRepository.deleteOneById(postId);
    await this.authRepository.removePostFromUserProfile(getOnePost.owner, postId);
    await this.commentRepository.deleteAll(postId);
    return deletedPost;
  }

}

var _default = PostService;
exports.default = _default;