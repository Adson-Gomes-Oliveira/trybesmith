import JOI from 'joi';
import { IProduct } from '../interfaces/product.interface';
import status from '../helpers/http.status';

const create = (payload: IProduct<number>) => {
  const payloadIsValid = Object.values(payload).length >= 1;
  if (!payloadIsValid) return { message: 'Invalid Payload!', code: status.BAD_REQUEST }; 

  const { error } = JOI.object({
    name: JOI.string().min(3).required(),
    amount: JOI.string().min(3).required(),
  }).validate(payload);
  
  if (error) {
    if (error.details[0].type.includes('required')) {
      return { message: error.message, code: status.BAD_REQUEST };
    }

    return { message: error.message, code: status.UNPROCESSABLE };
  }

  return {};
};

export default {
  create,
};
