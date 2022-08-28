import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/error.interface';

function error(err: IError, _req: Request, res: Response, _next: NextFunction): Response {  
  return res.status(err.code).json(err);
}

export default error;
