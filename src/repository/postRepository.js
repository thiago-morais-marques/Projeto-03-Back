/* eslint-disable indent */
class PostRepository {
    constructor(Model) {
        this.Model = Model;
    }

    async findAllTittleById(title, id) {
        const titleRegex = new RegExp(title, 'i');
        const post = await this.Model.find({
            owner: id, 
            title: { $regex: titleRegex }, 
        });

        return post;
    }

    async create(postData) {
        const newPost = await this.Model.create(postData);
            return newPost;
    }
    
    async findOneByIdAndOwnerId(id, ownerId) {
        const posts = await this.Model.findOne({
            _id: id,
            owner: ownerId,
        });

        return posts;
    }

    async updatePostById(id, postData) {
        const editPost = await this.Model.findBiIdAndUpdate(
            id, 
            postData,
            { new: true },
            );

            return editPost;
    }

    async deleteOneBId(id) {
        await this.Model.FindByIdAndDelete(id);

    }

};


export default PostRepository;