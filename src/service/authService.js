/* eslint-disable class-methods-use-this */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import EmailAlreadyInUseException from '../exceptions/EmailAlreadyInUseException';
import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';
import { registerSchema, loginSchema } from '../validation/authValidation';
import { editUserValidation } from '../validation/editUserValidation';
import { idValidation } from '../validation/idValidation';
class AuthService {
  constructor(repository) {
    this.authRepository = repository;
  }

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
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION_TIME },
    );
    return { token };
  }

  async editUser(userId, body) {
    await editUserValidation(body);
    idValidation(userId);
    const userData = {name: body.name, email: body.email, password: body.password};
    const editedUser = await this.authRepository.updateUserById(userId, userData);
    return editedUser;
  }

  async findAllUsers (name='') {
    const users = await this.authRepository.findAllByUserName(name);
    return users;
  }

  async deleteUser(userId) {
    idValidation(userId);
    await this.authRepository.deleteOneById(userId);
  }

}



export default AuthService;
