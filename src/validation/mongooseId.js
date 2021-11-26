/* eslint-disable no-trailing-spaces */
/* eslint-disable no-empty */
/* eslint-disable indent */
/* eslint-disable space-before-blocks */
import { isValidObjectId } from 'mongoose';
import InvalidIdException from '../exceptions/InvalidIdException';

const validateId = (id) => {
    const isValid = isValidObjectId(id)
    if(!isValid){
        throw new InvalidIdException();
    }
};


export default validateId;
