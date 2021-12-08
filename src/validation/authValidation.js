// usa o YUP para fazer a validação das informações passadas

import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

const registerSchema = async (body) => {
  const schema = yup.object().shape({
    userName: yup.string().required('Required field').min(5, 'Mimimum of 5 charracters').max(15, 'Maximum of 15 charracters'),
    name: yup.string().required('Required field').min(3, 'Mimimum of 3 charracters').max(100, 'Maximum of 150 charracters'),
    email: yup.string().required('Required field').email('Invalid format'),
    password: yup.string().required('Required field').min(6, 'Mimimum of 6 charracters').max(10, 'Maximum of 10 charracters'),
    role: yup.string().oneOf(['user', 'admin']),
    active: yup.boolean().oneOf([true, false]),
  });

  try {
        await schema.validate(body, { abortEarly: false });
  } catch (error) {
    const errors = error.inner.map((err) => ({
    field: err.path,
    error: err.errors.length > 0 ? err.errors : err.errors[0],
  }));

    throw new InvalidBodyRequestException(errors);
  }
};

export { registerSchema };

const loginSchema = async (body) => {
  const schema = yup.object().shape({
    email: yup.string().required('Required field').email('Invalid format'),
    password: yup.string().required('Required field').max(150, 'Maximum of 150 charracters'),
    });

    try {
    await schema.validate(body, { abortEarly: false });
    } catch (error) {
    const errors = error.inner.map((err) => ({
        field: err.path,
        error: err.errors.length > 0 ? err.errors : err.errors[0],
    }));

    throw new InvalidBodyRequestException(errors);
    }
};

export { loginSchema };
