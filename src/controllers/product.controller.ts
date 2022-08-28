import { Request, Response } from 'express';
import { IProduct } from '../interfaces/product.interface';
import IReturn from '../interfaces/service.returns';
import productService from '../services/product.service';

async function getAll(_req: Request, res: Response): Promise<Response> {
  const data: IReturn = await productService.getAll();
  return res.status(data.code).json(data.data);
}

async function create(req: Request, res: Response): Promise<Response> {
  const payload: IProduct<number> = req.body;
  const data: IReturn = await productService.create(payload);
  return res.status(data.code).json(data.data);
}

export default {
  getAll,
  create,
};
