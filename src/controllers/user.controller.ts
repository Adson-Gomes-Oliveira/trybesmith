import { Request, Response, NextFunction } from 'express';
import { IUser, User } from '../interfaces/user.interface';
import IReturn from '../interfaces/service.returns';
import IError from '../interfaces/error.interface';
import CustomError from '../helpers/custom.error';
import userService from '../services/user.service';

async function login(req: Request, res: Response, next: NextFunction)
  : Promise<Response | undefined> {
  try {
    const payload: User = req.body;
    const data: IReturn | IError = await userService.login(payload);

    if (data.message) throw new CustomError(data);

    return res.status(data.code).json(data.data);
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction)
  : Promise<Response | undefined> {
  try {
    const payload: IUser<number> = req.body;
    const data: IReturn | IError = await userService.create(payload);
  
    if (data.message) throw new CustomError(data);
  
    return res.status(data.code).json(data.data);
  } catch (error) {
    next(error);
  }
}

export default {
  login,
  create,
};