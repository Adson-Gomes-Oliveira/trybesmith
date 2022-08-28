export interface IProduct<T> {
  id?: T,
  name: string,
  amount: string,
  orderId?: T,
}
