import {IProduct} from "../product/product.model";

export interface IUser {
  id: string,
  liked: Array<IProduct>,
  firstName: string,
  lastName: string,
  email: string,
  address: Array<string>,
  orders: Array<IProduct>,
  phone: string,
  role: string
}

export class User implements IUser {
  constructor(
    public id: string,
    public address: Array<string>,
    public email: string,
    public firstName: string,
    public lastName: string,
    public liked: Array<IProduct>,
    public orders: Array<IProduct>,
    public phone: string,
    public role: string
  ) {
  }
}
