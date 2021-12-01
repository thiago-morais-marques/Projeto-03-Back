// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em commentService

class CommentNotFoundException extends Error {
  constructor() {
    super();
    this.message = 'Comment not found';
    this.status = 400;
  }
}

export default CommentNotFoundException;
