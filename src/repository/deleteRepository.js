import { Router } from 'express'


class DeletePostRepository {
    constructor(Model) {
        this.Model = Model;
    }

    async deleAllPostById(postId) {
        await this.Model.deleteMany({ post: postId, comment: postId}); //validar na pasta models.
    }

}


export default DeletePostRepository();