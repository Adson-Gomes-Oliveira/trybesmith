import { ResultSetHeader } from 'mysql2';
import connection from './connection';
import IOrder from '../interfaces/order.interface';

const newOrders = (orders: IOrder<number>[]) => {
  const unitedOrders: IOrder<number>[] = [];
  orders.forEach((ord: IOrder<number>): void => {
    const sameOrder = orders.filter((order) => order.id === ord.id);
    const alreadyExist = unitedOrders.some((order) => order.id === sameOrder[0].id);

    if (!alreadyExist) {
      const unionOrders = {
        id: ord.id,
        userId: ord.userId,
        productsIds: sameOrder.map((order) => order.productsIds),
      };
  
      unitedOrders.push(unionOrders as IOrder<number>);
    }
  });

  return unitedOrders;
};

async function getAll(): Promise<IOrder<number>[]> {
  const [request] = await connection.execute(`
    SELECT ord.id, ord.userId, pro.id as productsIds
    FROM Trybesmith.Orders as ord
    INNER JOIN Trybesmith.Products as pro
    ON ord.id = pro.orderId;
  `);

  return newOrders(request as IOrder<number>[]);
}

async function addOrder(userID: number, productId: number): Promise<void> {
  const request = await connection.execute<ResultSetHeader>(`
    INSERT INTO Trybesmith.Orders (userId) VALUES
      (?);
  `, [userID]);

  const [dataInserted] = request;
  
  await connection.execute(`
    UPDATE Trybesmith.Products
    SET orderId = ?
    WHERE id = ?;
  `, [dataInserted.insertId, productId]);
}

async function create(payload: IOrder<number>)
  : Promise<IOrder<number>> {
  const promise = [];
  
  const products = payload.productsIds as [];

  for (let index = 0; index < products.length; index += 1) {
    promise.push(addOrder(payload.userId as number, products[index]));
  }

  await Promise.all(promise);

  return payload;
}

export default {
  getAll,
  create,
};
