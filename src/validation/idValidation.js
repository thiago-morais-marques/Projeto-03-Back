// usa o mongoose para fazer a validação da ID

import mongoose from 'mongoose';
import InvalidIdException from '../exceptions/InvalidIdException';

const idValidation = (id) => {
  const isIdValid = mongoose.isValidObjectId(id);
  if (!isIdValid) {
    throw new InvalidIdException();
  }
};

export default idValidation;
