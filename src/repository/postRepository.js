// Classe que faz a conexão com o modelo de Post usando os métodos do mongoose

class PostRepository {
  constructor(model) {
    this.postModel = model;
  }

  // busca todos os posts pelo título
  async getAll(title) {
    const posts = await this.postModel.find({
      title: { $regex: new RegExp(title, 'i') },
    }).populate('comments');
    return posts;
  }

  // busca todos os posts pelo título e texto
  async getAllByTextAndTitle(title, text) {
  const posts = await this.postModel.find({
    title: { $regex: new RegExp(title, 'i') },
    text: { $regex: new RegExp(text, 'i') },
  }).populate('comments');
  return posts;
  }

  // busca todos os posts pelo Id de usuário
  async findAllByOwnerId(ownerId) {
    const posts = await this.postModel.find({ owner: ownerId });
    return posts;
  }

  // busca um post pelo ID
  async getOne(id) {
    const posts = await this.postModel.findById(id).populate('comments');
    return posts;
  }

  // cria um post e atribui sua tirularidade ao ID do usuário
  async create(body, userId) {
    const newPost = await this.postModel.create({ ...body, owner: userId });
    return newPost;
  }

  // procura um post pelo ID dele e do usuário
  async findOneByIdAndOwnerId(postId, ownerId) {
    const post = await this.postModel.findOne({
      _id: postId,
      owner: ownerId,
    }).populate('comments');
    return post;
  }

  // atualiza um post pelo iD com as informações do body
  async updatePostById(postId, infoToUpdate) {
    const editedPost = await this.postModel.findByIdAndUpdate(
    { _id: postId },
    infoToUpdate,
    { new: true },
    );
    return editedPost;
  }

  // busca um post pelo ID e deleta ele
  async deleteOneById(postId) {
    await this.postModel.findByIdAndDelete(postId);
  }

  // deleta todos os posts de um usuário
  async deleteAllById(userId) {
    await this.postModel.deleteMany({ owner: userId }).populate('comments');
  }

  // vincula um comentário a um post
  async insertCommentId(postId, commentId) {
    await this.postModel.findByIdAndUpdate(postId, { $push: { comments: commentId } });
  }

  // desvincula um comentário de um post
  async removeCommentId(postId, commentId) {
    await this.postModel.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
  }
}

export default PostRepository;
