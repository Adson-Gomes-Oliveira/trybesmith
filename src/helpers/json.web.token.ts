import JWT from 'jsonwebtoken';
import { Token, User } from '../interfaces/user.interface';
// import dotenv from 'dotenv';

// dotenv.config();
const JWT_SECRET = 'meutokendesuccesso';

export const createToken = (user: User): Token => {
  const token = JWT.sign({ data: user }, JWT_SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  return { token };
};

type Decoded = {
  data: User,
  iat: string,
  exp: string,
};

export const checkToken = (token: string): User => {
  const decoded = JWT.verify(token, JWT_SECRET);
  const { data } = decoded as unknown as Decoded;
  return data;
};