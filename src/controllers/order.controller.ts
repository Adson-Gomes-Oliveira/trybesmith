import { Request, Response, NextFunction } from 'express';
import IOrder from '../interfaces/order.interface';
import IReturn from '../interfaces/service.returns';
import orderService from '../services/order.service';
import CustomError from '../helpers/custom.error';

async function getAll(_req: Request, res: Response): Promise<Response> {
  const data: IReturn = await orderService.getAll();
  return res.status(data.code).json(data.data);
}

async function create(req: Request, res: Response, next: NextFunction)
  :Promise<Response | undefined> {
  try {
    const payload: IOrder<number> = req.body;
    
    const data: IReturn = await orderService.create(payload, req.user);

    if (data.message) throw new CustomError(data);

    return res.status(data.code).json(data.data);
  } catch (error) {
    next(error);
  }
}

export default {
  getAll,
  create,
};
