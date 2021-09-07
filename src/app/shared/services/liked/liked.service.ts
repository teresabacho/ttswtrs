import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import {IOrder} from "../../model/order/order.model";
import {IProduct} from "../../model/product/product.model";

@Injectable({
  providedIn: 'root'
})
export class LikedService {

  constructor(
    private db: AngularFireDatabase,
  ) {
  }

  getFavoritesFirebaseData(): Observable<any> {
    return this.db.list('/db/orders').valueChanges();
  }

  pushFavoritesFirebase(product: IProduct) {
    return this.db.list('/db/orders').push(product);
  }

  addToLiked(product: IProduct): void {
    let liked: Array<IProduct> = [];
    if(localStorage.getItem('liked')){
      liked.push(product);
    } else {
      liked.push(product);
    }
    localStorage.setItem('liked', JSON.stringify(liked));
  }



}
