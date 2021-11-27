import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';
import mongoose from 'mongoose';

class CommentService {
        constructor(commentRepository, postService) {
          this.commentRepository = commentRepository;
          this.postService = postService;
        }

        async findAllByPostId(postId) {
        
            const comments = await this.commentRepository.findAllByPostId(postId);
        
            return comments;
        }
        
        async create(body, postId) {
          const schema = yup.object().shape({
            text: yup.string().required('Required Field').min(1, 'Minimum of 1 characters').max(150, 'Maximum of 150 characters'),
            
          });
          try {
            await schema.validate(body, { abortEarly: false });
          } catch (error) {
            const errors = error.inner.map((err) => ({
              field: err.path,
              error: err.errors.length > 0 ? err.errors : err.errors[0],
            }));
            throw new InvalidBodyRequestException(errors);
          }
          const isIdValid = mongoose.isValidObjectId(ownerId);
          if (!isIdValid) {
            throw new InvalidIdException();
          }
          const savedComment = await this.commentRepository.createNewComment({ ...body, post: postId });
                   await this.postRepository.insertCommentId(postId, savedComment._id);
          return savedComment;
        }

}








export default CommentService;