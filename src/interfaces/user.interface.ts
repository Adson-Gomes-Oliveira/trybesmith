export interface IUser<T> {
  id?: T,
  username: string,
  classe: string,
  level: number,
  password: string,
}

export type User = {
  username: string;
  password: string;
};

export type Token = {
  token: string;
};
