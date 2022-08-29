import { IUser, Token } from './user.interface';
import { IProduct } from './product.interface';
import IOrder from './order.interface';

interface IReturn {
  data?: Token | IProduct<number> | IProduct<number>[] 
  | IUser<number> | IOrder<number> | IOrder<number>[],
  code: number,
  message?: string, 
}

export default IReturn;
