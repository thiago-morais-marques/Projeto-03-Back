class AuthRepository {
    constructor(model) {
      this.authModel = model;
    }
  
    async register(body) {
      const newUser = await this.authModel.create(body);
      return newUser;
    }
  
    async findUserByEmail(email) {
      const user = await this.authModel.findOne({ email });
      return user;
    }
  }
  
  export default AuthRepository;
  