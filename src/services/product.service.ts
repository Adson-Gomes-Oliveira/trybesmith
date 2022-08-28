import { IProduct } from '../interfaces/product.interface';
import IReturn from '../interfaces/service.returns';
import productsModel from '../models/products.model';
import status from '../helpers/http.status';
import valid from '../validations/product.validations';

async function getAll(): Promise<IReturn> {
  const result: IProduct<number>[] = await productsModel.getAll();
  return { data: result, code: status.OK };
}

async function create(payload: IProduct<number>): Promise<IReturn> {
  const validation = valid.create(payload);
  if (validation.message) return validation;

  const result: IProduct<number> = await productsModel.create(payload);
  return { data: result, code: status.CREATED };
}

export default {
  getAll,
  create,
};
