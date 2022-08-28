import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import { IProduct } from '../interfaces/product.interface';

async function getAll(): Promise<IProduct<number>[]> {
  const [request] = await connection.execute(`
    SELECT * FROM Trybesmith.Products;
  `);

  return request as IProduct<number>[];
}

async function create(payload: IProduct<number>): Promise<IProduct<number>> {
  const request = await connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.Products (name, amount) VALUES
      (?, ?);
  `, [payload.name, payload.amount]);

  const [dataInserted] = request;

  return {
    id: dataInserted.insertId,
    ...payload,
  };
}

export default {
  getAll,
  create,
};
