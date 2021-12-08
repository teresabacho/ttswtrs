import {Injectable} from '@angular/core';
import {IProduct} from "../../model/product/product.model";
import {Observable} from "rxjs";
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {ICollection} from "../../model/collection/collection.model";
import {ICategory} from "../../model/category/category.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore
  ) {
  }


  getProducts(): Observable<any> {
    return this.afs.collection<IProduct>('products').valueChanges({idField: 'id'});
  }

  getOneProduct(productID: string | null): Observable<any> {
    return this.afs.doc<IProduct>(`products/${productID}`).valueChanges({idField: 'id'});
  }

  pushProduct(product: IProduct) {
    return this.afs.collection<IProduct>('products').add(product);
  }

  removeProduct(product: IProduct) {
    return this.afs.doc<IProduct>(`products/${product.id}`).delete();
  }

  updateProduct(product: IProduct, id: string) {
    return this.afs.doc<IProduct>(`products/${id}`).update(product);
  }

}
