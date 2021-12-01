// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em postService e em commentService

class InvalidOwnerException extends Error {
  constructor() {
    super();
    this.message = 'Invalid Owner';
    this.status = 400;
  }
}

export default InvalidOwnerException;
