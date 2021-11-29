class CommentRepository {
  constructor(model) {
    this.commentModel = model;
  }

  async findAllByPostId(postId) {
      const comment = await this.commentModel.find({post: postId});
      return comment;
  }

  async findByCommentId(commentId) {
    const comment = await this.commentModel.findById(commentId);
    return comment;
  }

  async createNewComment(newComment) {
    const savedComment = await this.commentModel.create(newComment);
    return savedComment;
  }

  async updateCommentById(commentId, commentData) {
    const editedComment = await this.commentModel.findByIdAndUpdate(
      commentId,
      commentData,
      { new: true },
    );
    return editedComment;
  }

  async deleteOne(commentId) {
    await this.commentModel.findByIdAndDelete(commentId);
  }
}

export default CommentRepository;
