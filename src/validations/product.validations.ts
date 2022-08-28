import JOI from 'joi';
import { IProduct } from '../interfaces/product.interface';
import status from '../helpers/http.status';

const create = (payload: IProduct<number>) => {
  const payloadIsValid = Object.values(payload).length >= 1;
  if (!payloadIsValid) return { message: 'Invalid Payload!', code: status.BAD_REQUEST }; 

  const { error } = JOI.object({
    name: JOI.string().required(),
    amount: JOI.string().required(),
  }).validate(payload);

  if (error) return { message: error.message, code: status.BAD_REQUEST };
  return {};
};

export default {
  create,
};
