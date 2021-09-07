import {IProduct} from "../product/product.model";

export interface IOrder {
  product: IProduct
  firstname: string,
  lastname: string,
  country: string,
  city: string,
  address: string,
  apartment: string,
  zipcode: number,
  phone: number,
  delivery: number
}

export class Order implements IOrder {
  constructor(
    public product: IProduct,
    public firstname: string,
    public lastname: string,
    public country: string,
    public city: string,
    public address: string,
    public apartment: string,
    public zipcode: number,
    public phone: number,
    public delivery: number
  ) {
  }
}

