import {ICollection} from "../collection/collection.model";
import {ICategory} from "../category/category.model";

export interface IProduct {
  id: string,
  collection: ICollection,
  category: ICategory,
  name: string,
  ref: string,
  price: number,
  color: string,
  size: Array<string>,
  composition: Array<string>,
  modelHeight: number,
  modelSize: string,
  images: Array<string>,
  count: number
}

export class Product implements IProduct {
  constructor(
    public id: string,
    public collection: ICollection,
    public category: ICategory,
    public name: string,
    public ref: string,
    public price: number,
    public color: string,
    public size: Array<string>,
    public composition: Array<string>,
    public modelHeight: number,
    public modelSize: string,
    public images: Array<string>,
    public count: number
  ) {
  }
}
