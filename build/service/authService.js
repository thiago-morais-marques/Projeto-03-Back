"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _EmailAlreadyInUseException = _interopRequireDefault(require("../exceptions/EmailAlreadyInUseException"));

var _InvalidCredentialsException = _interopRequireDefault(require("../exceptions/InvalidCredentialsException"));

var _authValidation = require("../validation/authValidation");

var _editUserValidation = require("../validation/editUserValidation");

var _idValidation = _interopRequireDefault(require("../validation/idValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Classe que faz validações, criptografia, gera o token e cria métodos
para serem usados no controller */
class AuthService {
  constructor(authRepository, postRepository, commentRepository) {
    this.authRepository = authRepository;
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  } // faz o registro do usuário e criptografia da senha


  async register(body) {
    await (0, _authValidation.registerSchema)(body);
    const user = await this.authRepository.findUserByEmail(body.email);

    if (user) {
      throw new _EmailAlreadyInUseException.default();
    }

    const salt = _bcryptjs.default.genSaltSync(10);

    const userWithEncryptedPassword = { ...body,
      password: _bcryptjs.default.hashSync(body.password, salt)
    };
    const newUser = await this.authRepository.register(userWithEncryptedPassword);
    return newUser;
  } // faz o login do usuário e gera o token


  async authenticate(body) {
    await (0, _authValidation.loginSchema)(body);
    const user = await this.authRepository.findUserByEmail(body.email);

    if (!user) {
      throw new _InvalidCredentialsException.default();
    }

    const isPasswordValid = _bcryptjs.default.compareSync(body.password, user.password);

    if (!isPasswordValid) {
      throw new _InvalidCredentialsException.default();
    }

    const token = _jsonwebtoken.default.sign({
      id: user._id,
      role: user.role,
      active: user.active
    }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME
    });

    return {
      token
    };
  } // faz a edição dos dados do usuário


  async editUser(userId, body) {
    await (0, _editUserValidation.editUserValidation)(body);
    (0, _idValidation.default)(userId);

    const salt = _bcryptjs.default.genSaltSync(10);

    const userWithEncryptedPassword = { ...body,
      password: _bcryptjs.default.hashSync(body.password, salt)
    };
    const editedUser = await this.authRepository.updateUserById(userId, userWithEncryptedPassword);
    return editedUser;
  } // torna o usuário inativo (bloqueado)


  async blockUser(userId, body) {
    await (0, _editUserValidation.userBlockValidation)(body);
    (0, _idValidation.default)(userId);
    const blockedUser = await this.authRepository.adminBlockUser(userId, body);
    return blockedUser;
  } // lista todos os usuários


  async findAllUsers(name = '') {
    const users = await this.authRepository.findAllByUserName(name);
    return users;
  } // deleta um único usuário e mantêm os posts e comentários


  async deleteUser(userId) {
    (0, _idValidation.default)(userId);
    await this.authRepository.deleteOneById(userId);
  } // Deleta o usuário e todos os seus posts e comments


  async deleteUserPostsAndComments(userId) {
    (0, _idValidation.default)(userId);
    const foundPosts = await this.commentRepository.findAllByOwnerId(userId);
    const promises = foundPosts.map(e => {
      return this.postRepository.removeCommentId(e.post, e.id);
    });
    await Promise.all(promises);
    await this.commentRepository.deleteAllByOwnerId(userId);
    await this.postRepository.deleteAllById(userId);
    await this.authRepository.deleteOneById(userId);
  }

}

var _default = AuthService;
exports.default = _default;