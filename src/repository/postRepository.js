import mongoose from 'mongoose';

import InvalidIdException from '../exceptions/InvalidIdException';

class PostRepository {
  constructor(model) {
    this.postModel = model;
  }

  async getAll(title/* , userId */) {
    const posts = await this.postModel.find({
      title: { $regex: new RegExp(title, 'i') },
      /* owner: userId, */
    });
    return posts;
  }

  async getOne(id) {
    if (!mongoose.isValidObjectId(id)) {
      throw new InvalidIdException();
    }

    const posts = await this.postModel.findById(id).populate('comments');
    return posts;
  }

  async create(body, userId) {
    const newPost = await this.postModel.create({ ...body, owner: userId });
    return newPost;
  }

  async findOneByIdAndOwnerId(postId, ownerId) {
    const post = await this.postModel.findOne({
      _id: postId,
      owner: ownerId,
    }).populate('comments');
    return post;
  }

  async updatePostById(postId, infoToUpdate) {
    const editedPost = await this.postModel.findByIdAndUpdate(
    { _id: postId }, 
    infoToUpdate, 
    { new: true },
    );
    return editedPost;
  }

  async insertCommentId(postId, commentId) {
    await this.postModel.findByIdAndUpdate(postId, { $push: { comments: commentId } });
  }

  async deleteOneById(postId) {
    await this.postModel.findByIdAndDelete(postId);    
  }
}

export default PostRepository;
