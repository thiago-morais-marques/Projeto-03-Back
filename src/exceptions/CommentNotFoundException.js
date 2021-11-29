
class CommentNotFoundException extends Error {
    constructor() {
      super();
      this.message = 'Comment not found';
      this.status = 400;
    }
  }
  
  export default CommentNotFoundException;
  