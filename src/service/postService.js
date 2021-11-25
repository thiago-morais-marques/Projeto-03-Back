/* eslint-disable indent */
import validateId from "../validation/mongooseId";
import PostNotFoundException from '../exceptions/PostNotFoundException'


class PostService {
    constructor(postRepository) {
        this.postRepository = postRepository;
        
    }

    async findAllTittleById(title = '', id) {
        const post = await this.postRepository.findAllTittleById(title, id);
        
        return post;
    }

    async create(body, id) {
        await body.validate();

        const postData = {
            title: body.title,
            description: body.description,
            owner: id,
        };

        const newPost = await this.postRepository.create(postData);
        return newPost;
    }

        async findOneByIdAndOwnerId(id, ownerId) {
            validateId(id);
        const posts = await this.postRepository.findOneByIdAndOwnerId(id, ownerId);

        return posts;
    }

    async updateOnePost(id, ownerId, body) {
        await body.validate();
        validateId(id);

       await validatePostExists(id, ownerId);

        const postData = {
            title: body.title, 
            description: body.description,
        }

        const editedPost = await this.postRepository.updatePostById(id, postData);

        return editedPost;
    }

    async deleteOne(id, ownerId) {
        validateId(id);

        await validatePostExists(id, ownerId);

        await this.postRepository.deleteOneBId(id)

        await this.postsRepository.Dele
    }

    async validetePostExists(id, ownerId) {
        const post = await this.postRepository.findOneByIdAndOwnerId(id, ownerId);

        if(!post) {
            throw new PostNotFoundException();
        }


    }

}


export default PostService;