// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em adminController e routes

class NotAuthenticatedException extends Error {
  constructor(message) {
    super();
    this.status = 401;
    this.message = message;
  }
}

export default NotAuthenticatedException;
