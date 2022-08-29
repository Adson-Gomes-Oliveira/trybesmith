import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IUser, User } from '../interfaces/user.interface';

async function checkCredentials(payload: User): Promise<boolean> {
  const [request] = await connection.execute(`
    SELECT * FROM Trybesmith.Users
    WHERE username = ? AND password = ?;
  `, [payload.username, payload.password]);

  const userExist = Object.keys(request).length > 0;
  
  if (!userExist) return false;
  return true;
}

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
  checkCredentials,
  create,
};
