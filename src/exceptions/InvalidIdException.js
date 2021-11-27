class InvalidIdException extends Error {
  constructor() {
    super();

    this.status = 400;
    this.message = 'Invalid Id informed';
  }
}

export default InvalidIdException;
