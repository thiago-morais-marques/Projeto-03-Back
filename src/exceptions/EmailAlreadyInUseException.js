class EmailAlreadyInUseException extends Error {
  constructor() {
    super();

    this.status = 400;
    this.message = 'This email is already in use. Please choose another';
  }
}

export default EmailAlreadyInUseException;
