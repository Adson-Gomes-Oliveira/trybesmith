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
    username: JOI.string().required(),
    classe: JOI.string().required(),
    level: JOI.number().required(),
    password: JOI.string().required(),
  }).validate(payload);

  if (error) return { message: error.message, code: status.BAD_REQUEST };
  return {};
};

export default {
  login,
  create,
};
