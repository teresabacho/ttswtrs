import {IProduct} from "../product/product.model";

export interface IOrder {
  products: Array<IProduct>,
  firstname: string,
  lastname: string,
  country: string,
  city: string,
  address: string,
  apartment: string,
  zipcode: number,
  phone: number,
  email: string,
  delivery: number
}

export class Order implements IOrder {
  constructor(
    public products: Array<IProduct>,
    public firstname: string,
    public lastname: string,
    public country: string,
    public city: string,
    public address: string,
    public apartment: string,
    public zipcode: number,
    public phone: number,
    public email: string,
    public delivery: number
  ) {
  }
}

