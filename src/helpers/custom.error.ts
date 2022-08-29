import IError from '../interfaces/error.interface';
import IReturn from '../interfaces/service.returns';

class CustomError extends Error {
  code: number;

  constructor(data: IError | IReturn) {
    super(data.message);
    this.code = data.code;
  }
}

export default CustomError;
