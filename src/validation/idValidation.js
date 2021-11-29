import mongoose from 'mongoose';
import InvalidIdException from '../exceptions/InvalidIdException';

const idValidation = (id) => {
  const isIdValid = mongoose.isValidObjectId(id);
  if (!isIdValid) {
    throw new InvalidIdException();
  }
}

export { idValidation };
