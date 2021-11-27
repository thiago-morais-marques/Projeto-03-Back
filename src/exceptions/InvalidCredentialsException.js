class InvalidCredentialsException extends Error {
  constructor() {
    super();

    this.status = 400;
    this.message = 'Email or password does not match';
  }
}

export default InvalidCredentialsException;
