// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em authService

class EmailAlreadyInUseException extends Error {
  constructor() {
    super();
    this.status = 400;
    this.message = 'This email is already in use. Please choose another';
  }
}

export default EmailAlreadyInUseException;
