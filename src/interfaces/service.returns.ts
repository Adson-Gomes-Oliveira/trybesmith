import { IUser, Token } from './user.interface';
import { IProduct } from './product.interface';

interface IReturn {
  data?: Token | IProduct<number> | IProduct<number>[] | IUser<number>,
  code: number,
  message?: string, 
}

export default IReturn;
