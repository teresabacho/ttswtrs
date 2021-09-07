export interface ICollection {
  id: string,
  name: string,
  path: string
}

export class Category implements ICollection{
  constructor(
    public id: string,
    public name: string,
    public path: string,) {
  }
}
