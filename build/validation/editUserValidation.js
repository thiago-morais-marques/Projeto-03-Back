"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userBlockValidation = exports.editUserValidation = void 0;

var yup = _interopRequireWildcard(require("yup"));

var _InvalidBodyRequestException = _interopRequireDefault(require("../exceptions/InvalidBodyRequestException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// usa o YUP para fazer a validação das informações passadas
const editUserValidation = async body => {
  const schema = yup.object().shape({
    name: yup.string().required('Required field').min(3, 'Mimimum of 3 charracters').max(150, 'Maximum of 150 charracters'),
    email: yup.string().required('Required field').email('Invalid format'),
    password: yup.string().required('Required field').min(6, 'Mimimum of 6 charracters').max(50, 'Maximum of 50 charracters'),
    role: yup.string().oneOf(['user', 'admin']),
    active: yup.boolean().oneOf([true, false])
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
    throw new _InvalidBodyRequestException.default(errors);
  }
};

exports.editUserValidation = editUserValidation;

const userBlockValidation = async body => {
  const schema = yup.object().shape({
    active: yup.boolean().required('Required').oneOf([true, false])
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
    throw new _InvalidBodyRequestException.default(errors);
  }
};

exports.userBlockValidation = userBlockValidation;