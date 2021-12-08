import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import {ICategory} from "../../model/category/category.model";
import {ICollection} from "../../model/collection/collection.model";
import {IProduct} from "../../model/product/product.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  // new

  getCollections(): Observable<any> {
    return this.afs.collection<ICollection>('collections').valueChanges({idField: 'id'});
  }

  pushCollection(collection: ICollection) {
    return this.afs.collection<any>('collections').add(collection);
  }

  removeCollection(collection: ICollection) {
    return this.afs.doc<ICollection>(`collections/${collection.id}`).delete();
  }

  updateCollection(collection: ICollection, id: string) {
    return this.afs.doc<ICollection>(`collections/${id}`).update(collection);
  }
}
