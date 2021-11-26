"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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
    const user = await this.authModel.findOne({
      email
    });
    return user;
  }

}

var _default = AuthRepository;
exports.default = _default;