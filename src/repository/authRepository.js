// Classe que faz a conexão com o modelo de User usando os métodos do mongoose

class AuthRepository {
  constructor(model) {
    this.authModel = model;
  }

  // método para registrar o usuário no banco de dados de acordo com o que for passado no body
  async register(body) {
    const newUser = await this.authModel.create(body);
    return newUser;
  }

  // método para buscar um usuário no banco de dados pelo email
  async findUserByEmail(email) {
    const user = await this.authModel.findOne({ email });
    return user;
  }

  // método para buscar um usuário no banco de dados pelo ID
  async findUserById(userId) {
    const user = await this.authModel.findOne({ _id: userId });
    return user;
  }

  // método para buscar o usuário pelo ID e atualizar de acordo com as informações passadas no body
  async updateUserById(userId, userData) {
    const editedUser = await this.authModel.findByIdAndUpdate(
      userId,
      userData,
      { new: true },
    );
    return editedUser;
  }

  // método para alternar o campo active entre true e false (bloquear)
  async adminBlockUser(userId, body) {
    const blockedUser = await this.authModel.findByIdAndUpdate(
      { _id: userId },
      { active: body.active },
      { new: true },
    );
    return blockedUser;
  }

  // método para buscar todos os usuários pelo nome
  async findAllByUserName(name) {
    const users = await this.authModel.find({ name: { $regex: new RegExp(name, 'i') } });
    return users;
  }

  // método para buscar um usuário pelo ID e deletar ele
  async deleteOneById(userId) {
    await this.authModel.findByIdAndDelete(userId);
  }

  // método para vincular um post a um usuário
  async insertPostIntoUserProfile(userId, postId) {
    await this.authModel.findByIdAndUpdate(userId, { $push: { posts: postId } });
  }

  // método para desvincular um post de um usuário
  async removePostFromUserProfile(userId, postId) {
    await this.authModel.findByIdAndUpdate(userId, { $pull: { posts: postId } });
  }

  // método para vincular um comentário a um usuário
  async insertCommentIntoUserProfile(userId, commentId) {
    await this.authModel.findByIdAndUpdate(userId, { $push: { comments: commentId } });
  }

  // método para desvincular um comentário de um usuário
  async removeCommentFromUserProfile(userId, commentId) {
    await this.authModel.findByIdAndUpdate(userId, { $pull: { comments: commentId } });
  }
}

export default AuthRepository;
