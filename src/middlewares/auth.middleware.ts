import { Request, Response, NextFunction } from 'express';
import { checkToken } from '../helpers/json.web.token';
import CustomError from '../helpers/custom.error';
import status from '../helpers/http.status';
import { User } from '../interfaces/user.interface';

const tokenExist = (token: string): void => {
  if (!token) throw new CustomError({ message: 'Token not found', code: status.UNAUTHORIZED });
};

const tokenIsValid = (token: string): User => {
  try {
    const user = checkToken(token);
    return user;
  } catch (error) {
    throw new CustomError({ message: 'Invalid token', code: status.UNAUTHORIZED });
  }
};

const authentication = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const { authorization } = req.headers;

    tokenExist(authorization as string);
    const user = tokenIsValid(authorization as string);

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authentication;
