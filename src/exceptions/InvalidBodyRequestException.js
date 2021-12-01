// Exceção para vincular um erro a uma determinada mensagem e um status de erro
// Usada em commentValidation, authValidation, editUserValidation e postValidation

class InvalidBodyRequestException extends Error {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message;
  }
}

export default InvalidBodyRequestException;
