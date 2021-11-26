/* eslint-disable indent */
class PostNotFoundException extends Error {
    constructor() {
        super();
        this.message = 'Post not found to be updated ';
        this.status = 400;
    }
}

export default PostNotFoundException;