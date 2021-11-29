import InvalidBodyRequestException from "../exceptions/InvalidBodyRequestException";
import * as yup from 'yup';

const postValidation = async (body) => {
  const schema = yup.object().shape({
    title: yup
    .string()
    .required('Required field')
    .min(1, 'Mimimum of one charracter')
    .max(150, 'Maximum of 150 charracters'),
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
}

export { postValidation };
