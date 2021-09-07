import { Injectable } from '@angular/core';
import {ICategory} from "../../model/category/category.model";
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {IProduct} from "../../model/product/product.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  arrCategories: Array<ICategory> =[]

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getCategoriesFirebaseId(): Observable<any> {
    return this.db.list('/db/categories').snapshotChanges();
  }

  getCategoriesFirebaseData(): Observable<any> {
    return this.db.list('/db/categories').valueChanges();
  }

  pushCategoryFirebase(category: ICategory) {
    return this.db.list('/db/categories').push(category);
  }

  removeCategoryFirebase(id: string) {
    return this.db.list('/db/categories').remove(id);
  }

  updateCategoryFirebase(category: ICategory, id: string) {
    return this.db.list("/db/categories").update(id, category)
  }


}
