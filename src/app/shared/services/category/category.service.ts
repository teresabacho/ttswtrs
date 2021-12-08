import {Injectable} from '@angular/core';
import {ICategory} from "../../model/category/category.model";
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {IProduct} from "../../model/product/product.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private db: AngularFireDatabase,
    private afs: AngularFirestore
  ) {
  }

  // getCategoriesFirebaseId(): Observable<any> {
  //   return this.db.list('/db/categories').snapshotChanges();
  // }
  //
  // getCategoriesFirebaseData(): Observable<any> {
  //   return this.db.list('/db/categories').valueChanges();
  // }
  //
  // pushCategoryFirebase(category: ICategory) {
  //   return this.db.list('/db/categories').push(category);
  // }
  //
  // removeCategoryFirebase(id: string) {
  //   return this.db.list('/db/categories').remove(id);
  // }
  //
  // updateCategoryFirebase(category: ICategory, id: string) {
  //   return this.db.list("/db/categories").update(id, category)
  // }


  // new

  getCategories(): Observable<any> {
    return this.afs.collection<ICategory>('categories').valueChanges({idField: 'id'});
  }

  pushCategory(category: ICategory) {
    return this.afs.collection<any>('categories').add(category);
  }

  removeCategory(category: ICategory) {
    return this.afs.doc<ICategory>(`categories/${category.id}`).delete();
  }

  updateCategory(category: ICategory, id: string) {
    return this.afs.doc<ICategory>(`categories/${id}`).update(category);
  }

}
