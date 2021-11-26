// /* eslint-disable indent */
// class PostRepository {
//     constructor(Model) {
//         this.Model = Model;
//     }

//     async findAllTittleById(title, id) {
//         const titleRegex = new RegExp(title, 'i');
//         const post = await this.Model.find({
//             owner: id, 
//             title: { $regex: titleRegex }, 
//         });

//         return post;
//     }

//     async create(postData) {
//         const newPost = await this.Model.create(postData);
//             return newPost;
//     }
    
//     async findOneByIdAndOwnerId(id, ownerId) {
//         const posts = await this.Model.findOne({
//             _id: id,
//             owner: ownerId,
//         });

//         return posts;
//     }

//     async updatePostById(id, postData) {
//         const editPost = await this.Model.findBiIdAndUpdate(
//             id, 
//             postData,
//             { new: true },
//             );

//             return editPost;
//     }

//     async deleteOneBId(id) {
//         await this.Model.FindByIdAndDelete(id);

//     }

// };


// export default PostRepository;








////////////////////////////////////////////////////





import mongoose from 'mongoose';
import InvalidIdException from '../exceptions/InvalidIdException';
class PostRepository {
  constructor(model) {
    this.postModel = model;
  }


  async findAllTittleById(title, id) {
            const titleRegex = new RegExp(title, 'i');
            const post = await this.Model.find({
                owner: id, 
                title: { $regex: titleRegex }, 
            });
    
            return post;
        }


  async getAll(title, userId) {
    const posts = await this.postModel.find({
      title: { $regex: new RegExp(title, 'i') },
      owner: userId,
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
  async insertCommentId(postId, commentId) {
    await this.postModel.findByIdAndUpdate(postId, { $push: { comments: commentId } });
  }
}
export default PostRepository;














