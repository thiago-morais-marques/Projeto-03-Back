import * as yup from 'yup';
import InvalidBodyRequestException from '../exceptions/InvalidBodyRequestException';

const postValidation = async (body) => {
  const schema = yup.object().shape({
    title: yup
    .string()
    .required('Required field')
    .min(1, 'Mimimum of one charracter')
    .max(300, 'Maximum of 300 charracters'),
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
