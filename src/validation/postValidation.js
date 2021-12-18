// usa o YUP para fazer a validação das informações passadas

import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

const postValidation = async (body) => {
  const schema = yup.object().shape({
    title: yup.string().required('Required field').min(1, 'Mimimum of one charracter').max(150, 'Maximum of 150 charracters'),
    text: yup.string().required('Required field'),
    description: yup.string().min(10, 'Mimimum of 10 charracter').max(100, 'Maximum of 100 charracters'),
    imageURL: yup.string().required('Required field'),
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

export default postValidation;
