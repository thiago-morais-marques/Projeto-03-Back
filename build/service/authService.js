"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable class-methods-use-this */
// import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';
// import EmailAlreadyInUseException from '../exceptions/EmailAlreadyInUseException';
// import InvalidCredentialsException from '../exceptions/InvalidCredentialsException';
class AuthService {
  constructor(repository) {
    this.authRepository = repository;
  }

  async register(body) {
    // Validação de todos os campos enviados (campos obrigatórios, min/max caracteres, formato, etc)
    const schema = yup.object().shape({
      name: yup.string().required('Required field').min(3, 'Mimimum of 3 charracters').max(150, 'Maximum of 150 charracters'),
      email: yup.string().required('Required field').email('Invalid format'),
      password: yup.string().required('Required field').min(6, 'Mimimum of 6 charracters').max(50, 'Maximum of 50 charracters')
    });

    try {
      await schema.validate(body, {
        abortEarly: false
      });
    } catch (error) {
      const errors = error.inner.map(err => ({
        field: err.path,
        error: err.errors.length > 0 ? err.errors : err.errors[0]
      }));
      throw new InvalidBodyRequestException(errors);
    } // Validar se o email já não está em uso


    const user = await this.authRepository.findUserByEmail(body.email);

    if (user) {
      throw new EmailAlreadyInUseException();
    } // FALTA ENCRIPTARMOS A SENHA QUE O USUARIO INFORMOU ;-)


    const salt = _bcryptjs.default.genSaltSync(10);

    const userWithEncryptedPassword = { ...body,
      password: _bcryptjs.default.hashSync(body.password, salt)
    }; // CHAMAR O REPOSITORY PASSANDO OS DADOS DE CADASTRO PARA QUE ELE SALVE O USER NO BANCO

    const newUser = await this.authRepository.register(userWithEncryptedPassword);
    return newUser;
  }

  async authenticate(body) {
    // Validamos o body
    const schema = yup.object().shape({
      email: yup.string().required('Required field').email('Invalid format'),
      password: yup.string().required('Required field').max(150, 'Maximum of 150 charracters')
    });

    try {
      await schema.validate(body, {
        abortEarly: false
      });
    } catch (error) {
      const errors = error.inner.map(err => ({
        field: err.path,
        error: err.errors.length > 0 ? err.errors : err.errors[0]
      }));
      throw new InvalidBodyRequestException(errors);
    } // Chamar o findUserByEmail do repository para verificar se o user existe


    const user = await this.authRepository.findUserByEmail(body.email);

    if (!user) {
      throw new InvalidCredentialsException();
    } // Usar o bcrypt para verificar se a senha informada conicide com a senha que veio do banco


    const isPasswordValid = _bcryptjs.default.compareSync(body.password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    } // Gerar uma token com tempo de expiração e vamos retornar ao user


    const token = _jsonwebtoken.default.sign({
      id: user._id,
      role: user.role
    }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME
    });

    return {
      token
    };
  }

}

var _default = AuthService;
exports.default = _default;