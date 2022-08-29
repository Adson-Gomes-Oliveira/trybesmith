import { Request, Response } from 'express';
import IReturn from '../interfaces/service.returns';
import orderService from '../services/order.service';

async function getAll(_req: Request, res: Response): Promise<Response> {
  const data: IReturn = await orderService.getAll();
  return res.status(data.code).json(data.data);
}

export default {
  getAll,
};
