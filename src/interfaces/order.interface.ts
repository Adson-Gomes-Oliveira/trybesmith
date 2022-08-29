interface IOrder<T> {
  id?: T,
  userId: T,
  productsIds?: number | [],
}

export default IOrder;
