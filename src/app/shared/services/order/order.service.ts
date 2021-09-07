import { Injectable } from '@angular/core';
import {IProduct} from "../../model/product/product.model";
import {Observable, Subject} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {IOrder} from "../../model/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeBasket$ = new Subject<boolean>();

  constructor(
    private db: AngularFireDatabase,
  ) {
  }


  getOrdersFirebaseData(): Observable<any> {
    return this.db.list('/db/orders').valueChanges();
  }

  pushOrderFirebase(order: IOrder) {
    return this.db.list('/db/orders').push(order);
  }

  addToBasket(product: IProduct): void {
    let basket: Array<IProduct> = [];
    if (localStorage.getItem('basket')) {
      basket = JSON.parse(<string>localStorage.getItem('basket'));
      basket.push(product);
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.changeBasket$.next(true);
    // product.count = 1;
  }
}
