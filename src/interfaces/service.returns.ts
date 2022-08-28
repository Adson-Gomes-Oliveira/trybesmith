import { IProduct } from './product.interface';

interface IReturn {
  data?: IProduct<number> | IProduct<number>[],
  code: number,
  message?: string, 
}

export default IReturn;
