// usa o YUP para fazer a validação das informações passadas

import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

const commentValidation = async (body) => {
  const schema = yup.object().shape({
    text: yup.string().required('Required Field').max(500, 'Maximum of 500 characters'),
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

export default commentValidation;
