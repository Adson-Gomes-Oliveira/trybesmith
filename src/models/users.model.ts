import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IUser } from '../interfaces/user.interface';

async function create(payload: IUser<number>): Promise<IUser<number>> {
  const request = await connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES
      (?, ?, ?, ?);
  `, [payload.username, payload.classe, payload.level, payload.password]);

  const [dataInserted] = request;

  return {
    id: dataInserted.insertId,
    ...payload,
  };
}

export default {
  create,
};
