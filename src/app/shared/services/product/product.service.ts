import {Injectable} from '@angular/core';
import {IProduct} from "../../model/product/product.model";
import axios from "axios";
import {Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private arrProducts: Array<IProduct> = []

  constructor(
    private db: AngularFireDatabase,
  ) {
  }

  getProductsFirebase(): Observable<any> {
    return this.db.list('/db/products').snapshotChanges();
  }

  getProductsFirebaseData(): Observable<any> {
    return this.db.list('/db/products').valueChanges();
  }

  getByCategory(categoryName: string): Observable<any> {
    return this.db.list(`db/products/`).valueChanges();
  }

  getByID(id: string | null): Observable<any> {
    return this.db.object(`/db/products/${id}`).valueChanges();
  }

  // getByCollection(categoryName: string, collectionName: string): Observable<3
  // any> {
  //   return this.db.list(`db/products/`).valueChanges();
  // }

  // getOneProductFirebase(): Observable<any>{
  //   return
  // }

  pushProductFirebase(product: IProduct) {
    return this.db.list('/db/products').push(product);
  }

  removeProductFirebase(id: string) {
    return this.db.list('/db/products').remove(id);
  }

  updateProductsFirebase(product: IProduct, id: string) {
    return this.db.list("/db/products").update(id, product)
  }
}
