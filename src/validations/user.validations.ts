import JOI from 'joi';
import { IUser, User } from '../interfaces/user.interface';
import status from '../helpers/http.status';

const login = (payload: User) => {
  const payloadIsValid = Object.values(payload).length >= 1;
  if (!payloadIsValid) return { message: 'Invalid Payload!', code: status.BAD_REQUEST };

  const { error } = JOI.object({
    username: JOI.string().required(),
    password: JOI.string().required(),
  }).validate(payload);

  if (error) return { message: error.message, code: status.BAD_REQUEST };
  return {};
};

const create = (payload: IUser<number>) => {
  const payloadIsValid = Object.values(payload).length >= 1;
  if (!payloadIsValid) return { message: 'Invalid Payload!', code: status.BAD_REQUEST };

  const { error } = JOI.object({
    username: JOI.string().min(3).required(),
    classe: JOI.string().min(3).required(),
    level: JOI.number().min(1).required(),
    password: JOI.string().min(8).required(),
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
  login,
  create,
};
