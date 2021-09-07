import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import {ICategory} from "../../model/category/category.model";
import {ICollection} from "../../model/collection/collection.model";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  getCollectionsFirebaseId(): Observable<any> {
    return this.db.list('/db/collections').snapshotChanges();
  }

  getCollectionsFirebaseData(): Observable<any> {
    return this.db.list('/db/collections').valueChanges();
  }

  pushCollectionFirebase(collection: ICollection) {
    return this.db.list('/db/collections').push(collection);
  }

  removeCollectionFirebase(id: string) {
    return this.db.list('/db/collections').remove(id);
  }

  updateCollectionFirebase(collection: ICollection, id: string) {
    return this.db.list("/db/collections").update(id, collection)
  }
}
