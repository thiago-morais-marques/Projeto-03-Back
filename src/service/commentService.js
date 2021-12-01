// Classe que faz validações e cria métodos para serem usados no controller

import CommentNotFoundException from '../exceptions/CommentNotFoundException';
import InvalidOwnerException from '../exceptions/InvalidOwnerException';
import commentValidation from '../validation/commentValidation';
import idValidation from '../validation/idValidation';

class CommentService {
  constructor(commentRepository, postRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  // verifica a titularidade de um comentário
  async validateOwnership(commentId, ownerId) {
    const ownership = await this.commentRepository.findOneByIdAndOwnerId(commentId, ownerId);
    if (!ownership) {
      throw new InvalidOwnerException();
    }
  }

  // encontra um comentário pelo ID e verifica sua titularidade
  async findCommentIdAndValidateOwnership(commentId, ownerId) {
    const comment = await this.commentRepository.findByCommentId(commentId);
    if (!comment) {
      throw new CommentNotFoundException();
    }
    await this.validateOwnership(commentId, ownerId);
    return comment;
  }

  // localiza todos os comentários de um post
  async findAllByPostId(postId) {
    const comments = await this.commentRepository.findAllByPostId(postId);
    return comments;
  }

  // cria um comentário vinculando ele a um post e a um usuário
  async create(body, postId, ownerId) {
    await commentValidation(body);
    idValidation(postId);
    const savedComment = await this.commentRepository.createNewComment({
      ...body,
      post: postId,
      owner: ownerId,
    });
    await this.postRepository.insertCommentId(postId, savedComment._id);
    return savedComment;
  }

  // método para um usuário atualizar as informações de um comentário
  async updateOne(commentId, ownerId, body) {
    await commentValidation(body);
    idValidation(commentId);
    await this.findCommentIdAndValidateOwnership(commentId, ownerId);
    const commentData = { text: body.text };
    const editedComment = await this.commentRepository.updateCommentById(commentId, commentData);
    return editedComment;
  }

  // metádo para um usuário deletar um comentário
  async deleteOne(commentId, ownerId) {
    idValidation(commentId);
    const comment = await this.findCommentIdAndValidateOwnership(commentId, ownerId);
    await this.commentRepository.deleteOne(commentId);
    await this.postRepository.removeCommentId(comment.post, commentId);
  }

  // método para um Admin deletar qualquer comentário
  async adminDeleteComment(commentId) {
    idValidation(commentId);
    const deletedComment = await this.commentRepository.deleteOne(commentId);
    const commentOwner = { owner: deletedComment.owner };
    await this.postRepository.removeCommentId(commentOwner, commentId);
    return deletedComment;
  }
}

export default CommentService;
