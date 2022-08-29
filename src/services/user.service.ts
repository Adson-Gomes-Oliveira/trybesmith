import { IUser, Token, User } from '../interfaces/user.interface';
import IReturn from '../interfaces/service.returns';
import usersModel from '../models/users.model';
import { createToken } from '../helpers/json.web.token';
import status from '../helpers/http.status';
import valid from '../validations/user.validations';

async function login(payload: User): Promise<IReturn> {
  const validation = valid.login(payload);
  if (validation.message) return validation;

  const result: boolean = await usersModel.checkCredentials(payload);
  if (!result) return { message: 'Username or password invalid', code: status.UNAUTHORIZED };

  const generateToken: Token = createToken(
    { username: payload.username, password: payload.password },
  );

  return { data: generateToken, code: status.OK };
}

async function create(payload:IUser<number>): Promise<IReturn> {
  const validation = valid.create(payload);
  if (validation.message) return validation;

  const generateToken: Token = createToken(
    { username: payload.username, password: payload.password },
  );

  await usersModel.create(payload);
  return { data: generateToken, code: status.CREATED };
}

export default {
  login,
  create,
};
