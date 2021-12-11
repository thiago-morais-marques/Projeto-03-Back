"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CommentNotFoundException = _interopRequireDefault(require("../exceptions/CommentNotFoundException"));

var _PostNotFoundException = _interopRequireDefault(require("../exceptions/PostNotFoundException"));

var _InvalidOwnerException = _interopRequireDefault(require("../exceptions/InvalidOwnerException"));

var _commentValidation = _interopRequireDefault(require("../validation/commentValidation"));

var _idValidation = _interopRequireDefault(require("../validation/idValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Classe que faz validações e cria métodos para serem usados no controller
class CommentService {
  constructor(commentRepository, postRepository, authRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
    this.authRepository = authRepository;
  } // verifica a titularidade de um comentário


  async validateOwnership(commentId, ownerId) {
    const ownership = await this.commentRepository.findOneByIdAndOwnerId(commentId, ownerId);

    if (!ownership) {
      throw new _InvalidOwnerException.default();
    }
  } // encontra um comentário pelo ID e verifica sua titularidade


  async findCommentIdAndValidateOwnership(commentId, ownerId) {
    const comment = await this.commentRepository.findByCommentId(commentId);

    if (!comment) {
      throw new _CommentNotFoundException.default();
    }

    await this.validateOwnership(commentId, ownerId);
    return comment;
  } // verifica se o Post existe


  async checkIfPostExists(postId) {
    const post = await this.postRepository.getOne(postId);

    if (!post) {
      throw new _PostNotFoundException.default();
    }

    return post;
  } // localiza todos os comentários de um post


  async findAllByPostId(postId) {
    const comments = await this.commentRepository.findAllByPostId(postId);
    return comments;
  } // cria um comentário vinculando ele a um post e a um usuário


  async create(body, postId, ownerId) {
    await (0, _commentValidation.default)(body);
    (0, _idValidation.default)(postId);
    await this.checkIfPostExists(postId);
    const savedComment = await this.commentRepository.createNewComment({ ...body,
      post: postId,
      owner: ownerId
    });
    await this.postRepository.insertCommentId(postId, savedComment._id);
    await this.authRepository.insertCommentIntoUserProfile(ownerId, savedComment._id);
    return savedComment;
  } // método para um usuário atualizar as informações de um comentário


  async updateOne(commentId, ownerId, body) {
    await (0, _commentValidation.default)(body);
    (0, _idValidation.default)(commentId);
    await this.findCommentIdAndValidateOwnership(commentId, ownerId);
    const commentData = {
      text: body.text
    };
    const editedComment = await this.commentRepository.updateCommentById(commentId, commentData);
    return editedComment;
  } // metádo para um usuário deletar um comentário


  async deleteOne(commentId, ownerId) {
    (0, _idValidation.default)(commentId);
    const comment = await this.findCommentIdAndValidateOwnership(commentId, ownerId);
    await this.commentRepository.deleteOne(commentId);
    await this.postRepository.removeCommentId(comment.post, commentId);
    await this.authRepository.removeCommentFromUserProfile(ownerId, commentId);
  } // método para um Admin deletar qualquer comentário


  async adminDeleteComment(commentId) {
    console.log(commentId);
    (0, _idValidation.default)(commentId);
    const comment = await this.commentRepository.deleteOne(commentId);
    await this.postRepository.removeCommentId(comment.post, commentId);
    await this.authRepository.removeCommentFromUserProfile(comment.owner, commentId);
  }

}

var _default = CommentService;
exports.default = _default;