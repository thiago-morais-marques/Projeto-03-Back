class AuthRepository {
    constructor(model) {
      this.authModel = model;
    }
  
    async register(body) {
      // Criar um novo modelo de user + salvando no banco
      const newUser = await this.authModel.create(body);
  
      return newUser;
    }
  
    async findUserByEmail(email) {
      const user = await this.authModel.findOne({ email });
  
      return user;
    }
  }
  
  export default AuthRepository;
  