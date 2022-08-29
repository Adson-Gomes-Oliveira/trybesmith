import { IUser, Token } from '../interfaces/user.interface';
import IReturn from '../interfaces/service.returns';
import usersModel from '../models/users.model';
import { createToken } from '../helpers/json.web.token';
import status from '../helpers/http.status';
import valid from '../validations/user.validations';

async function create(payload:IUser<number>): Promise<IReturn> {
  const validation = valid.create(payload);
  if (validation.message) return validation;

  const result: Token = createToken({ username: payload.username, password: payload.password });

  await usersModel.create(payload);
  return { data: result, code: status.CREATED };
}

export default {
  create,
};
