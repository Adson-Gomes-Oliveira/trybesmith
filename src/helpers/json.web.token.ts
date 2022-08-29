import JWT from 'jsonwebtoken';
import { Token, User, IUser } from '../interfaces/user.interface';
// import dotenv from 'dotenv';
// import status from './http.status';

// dotenv.config();
const JWT_SECRET = 'meutokendesuccesso';

export const createToken = (user: User): Token => {
  const token = JWT.sign({ data: user }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  return { token };
};

export const checkToken = (token: string): IUser<number> => {
  const decoded = JWT.verify(token, JWT_SECRET);
  console.log(`ESTE È O DECODED: ${decoded}`);
  
  return decoded as IUser<number>;
};