
class PostNotFoundException extends Error {
    constructor() {
      super();
      this.message = 'Post not found';
      this.status = 400;
    }
  }
  
  export default PostNotFoundException;
  