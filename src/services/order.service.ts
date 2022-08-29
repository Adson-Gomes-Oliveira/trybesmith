import { IUser, User } from '../interfaces/user.interface';
import IOrder from '../interfaces/order.interface';
import IReturn from '../interfaces/service.returns';
import ordersModel from '../models/orders.model';
import usersModel from '../models/users.model';
import status from '../helpers/http.status';
import valid from '../validations/order.validations';

async function getAll(): Promise<IReturn> {
  const result: IOrder<number>[] = await ordersModel.getAll();
  return { data: result, code: status.OK };
}

async function create(payload: IOrder<number>, user: User): Promise<IReturn> {
  const validation = valid.create(payload);
  if (validation.message) return validation;

  const findUser: IUser<number>[] = await usersModel.findUser(user);
  
  const payloadOrder = {
    userId: findUser[0].id,
    ...payload,
  };
  
  const result: IOrder<number> = await ordersModel.create(payloadOrder);
  return { data: result, code: status.CREATED };
}

export default {
  getAll,
  create,
};
