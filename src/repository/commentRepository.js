// Classe que faz a conexão com o modelo de Comment usando os métodos do mongoose

class CommentRepository {
  constructor(model) {
    this.commentModel = model;
  }

  // acha todos os comentários pelo ID do post
  async findAllByPostId(postId) {
      const comment = await this.commentModel.find({ post: postId }).populate('owner');
      return comment;
  }

  // acha um comentário pelo ID do comentário e do usuário
  async findOneByIdAndOwnerId(commentId, ownerId) {
    const comment = await this.commentModel.findOne({
      _id: commentId,
      owner: ownerId,
    });
    return comment;
  }

  // busca todos os posts pelo Id de usuário
  async findAllByOwnerId(ownerId) {
    const comments = await this.commentModel.find({ owner: ownerId });
    return comments;
  }

  // acha um comentário pelo ID do comentário
  async findByCommentId(commentId) {
    const comment = await this.commentModel.findById(commentId);
    return comment;
  }

  // cria um comentário de acordo com o que for passado no body
  async createNewComment(newComment) {
    const savedComment = await this.commentModel.create(newComment);
    return savedComment;
  }

  // busca pelo ID do comentário e atualiza ele de acordo com o que for passado no body
  async updateCommentById(commentId, commentData) {
    const editedComment = await this.commentModel.findByIdAndUpdate(
      commentId,
      commentData,
      { new: true },
    );
    return editedComment;
  }

  // busca um comentário pelo ID e deleta ele
  async deleteOne(commentId) {
    const deleteComment = await this.commentModel.findByIdAndDelete(commentId);
    return deleteComment;
  }

  // deleta todos os comentários do post
  async deleteAll(postId) {
    await this.commentModel.deleteMany({ post: postId });
  }

  // deleta todos os comentários de um usuário
  async deleteAllByOwnerId(userId) {
    await this.commentModel.deleteMany({ owner: userId });
  }
}

export default CommentRepository;
