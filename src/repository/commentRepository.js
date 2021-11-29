class CommentRepository {
  constructor(model) {
    this.commentModel = model;
  }

  async findAllByPostId(postId) {
      const comment = await this.commentModel.find({post: postId});
      return comment;
  }

  async createNewComment(newComment) {
    const savedComment = await this.commentModel.create(newComment);
    return savedComment;
  }
}

export default CommentRepository;
