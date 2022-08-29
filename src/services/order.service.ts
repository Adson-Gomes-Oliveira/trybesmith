import IOrder from '../interfaces/order.interface';
import IReturn from '../interfaces/service.returns';
import ordersModel from '../models/orders.model';
import status from '../helpers/http.status';

async function getAll(): Promise<IReturn> {
  const result: IOrder<number>[] = await ordersModel.getAll();
  return { data: result, code: status.OK };
}

export default {
  getAll,
};
