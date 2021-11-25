/* eslint-disable indent */
class InvalidIdException extends Error {
    constructor() {
        super();
        this.message = 'Invalid Id.';
        this.status = 400;
    }
}

export default InvalidIdException;