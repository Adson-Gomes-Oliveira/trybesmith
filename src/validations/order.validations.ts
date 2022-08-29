import JOI from 'joi';
import IOrder from '../interfaces/order.interface';
import status from '../helpers/http.status';

const create = (payload: IOrder<number>) => {
  const { error } = JOI.object({
    productsIds: JOI.array().min(1).required(),
  }).validate(payload);

  if (error) {
    console.log(error);
    
    if (error.details[0].type.includes('required')) {
      return { message: error.message, code: status.BAD_REQUEST };
    }

    if (error.details[0].type.includes('min')) {
      return { message: '"productsIds" must include only numbers', code: status.UNPROCESSABLE };
    }

    return { message: error.message, code: status.UNPROCESSABLE };
  }

  return {};
};

export default {
  create,
};