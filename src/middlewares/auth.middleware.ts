import { Request, Response, NextFunction } from 'express';
import { checkToken } from '../helpers/json.web.token';
import CustomError from '../helpers/custom.error';
import status from '../helpers/http.status';
import { IUser } from '../interfaces/user.interface';

const tokenExist = (token: string): void => {
  if (!token) throw new CustomError({ message: 'Token not found', code: status.UNAUTHORIZED });
};

const tokenIsValid = (token: string): IUser<number> => {
  const user = checkToken(token);
  return user;
};

const authentication = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    const { authorization } = req.headers;

    tokenExist(authorization as string);
    tokenIsValid(authorization as string);

    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
