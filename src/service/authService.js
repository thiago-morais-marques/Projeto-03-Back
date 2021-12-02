/* Classe que faz validações, criptografia, gera o token e cria métodos
para serem usados no controller */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import EmailAlreadyInUseException from '../exceptions/EmailAlreadyInUseException';
import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';
import { registerSchema, loginSchema } from '../validation/authValidation';
import { editUserValidation, userBlockValidation } from '../validation/editUserValidation';
import idValidation from '../validation/idValidation';

class AuthService {
  constructor(authRepository, postRepository, commentRepository) {
    this.authRepository = authRepository;
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }

  // faz o registro do usuário e criptografia da senha
  async register(body) {
    await registerSchema(body);
    const user = await this.authRepository.findUserByEmail(body.email);
    if (user) {
      throw new EmailAlreadyInUseException();
    }
    const salt = bcrypt.genSaltSync(10);
    const userWithEncryptedPassword = {
      ...body,
      password: bcrypt.hashSync(body.password, salt),
    };
    const newUser = await this.authRepository.register(userWithEncryptedPassword);
    return newUser;
  }

  // faz o login do usuário e gera o token
  async authenticate(body) {
    await loginSchema(body);
    const user = await this.authRepository.findUserByEmail(body.email);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    const isPasswordValid = bcrypt.compareSync(body.password, user.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, active: user.active },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    );
    return { token };
  }

  // faz a edição dos dados do usuário
  async editUser(userId, body) {
    await editUserValidation(body);
    idValidation(userId);
    const salt = bcrypt.genSaltSync(10);
    const userWithEncryptedPassword = {
      ...body,
      password: bcrypt.hashSync(body.password, salt),
    };
    const editedUser = await this.authRepository.updateUserById(userId, userWithEncryptedPassword);
    return editedUser;
  }

  // torna o usuário inativo (bloqueado)
  async blockUser(userId, body) {
    await userBlockValidation(body);
    idValidation(userId);
    const blockedUser = await this.authRepository.adminBlockUser(userId, body);
    return blockedUser;
  }

  // lista todos os usuários
  async findAllUsers(name = '') {
    const users = await this.authRepository.findAllByUserName(name);
    return users;
  }

  // deleta um único usuário e mantêm os posts e comentários
  async deleteUser(userId) {
    idValidation(userId);
    await this.authRepository.deleteOneById(userId);
  }

  // Deleta o usuário e todos os seus posts e comments
  async deleteUserPostsAndComments(userId) {
    idValidation(userId);
    const foundPosts = await this.commentRepository.findAllByOwnerId(userId);
    await foundPosts.map((e) => {
      console.log(e.post);
      console.log(e.id);
      return this.postRepository.removeCommentId(e.post, e.id);
    });
    await this.commentRepository.deleteAllByOwnerId(userId);
    await this.postRepository.deleteAllById(userId);
    await this.authRepository.deleteOneById(userId);
  }
}

export default AuthService;
