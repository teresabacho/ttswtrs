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

  addToLiked(product: IProduct): void {
    let liked: Array<IProduct> = [];
    let currentUser = JSON.parse(<string>localStorage.getItem('user'));
    liked = currentUser.liked;

    console.log(currentUser);

    if (liked.length !== 0) {
      liked = liked.filter(el => el.id !== product.id);
      liked.push(product);
    } else {
      liked.push(product);
    }
    currentUser.liked = liked;
    localStorage.setItem('user', JSON.stringify(currentUser));


    console.log(currentUser);
    console.log(liked);
  }

  removeFromLiked(product: IProduct): void {
    let liked: Array<IProduct> = [];
    let currentUser = JSON.parse(<string>localStorage.getItem('user'));
    liked = currentUser.liked;
    console.log(currentUser);

    liked = liked.filter(el => el.id !== product.id);
    currentUser.liked = liked;
    localStorage.setItem('user', JSON.stringify(currentUser));

    console.log(currentUser);
    console.log(liked);
  }

//   let basket: Array<IProduct> = [];
//   if (localStorage.getItem('basket')) {
//   basket = JSON.parse(<string>localStorage.getItem('basket'));
//   basket.push(product);
// } else {
//   basket.push(product);
// }
// localStorage.setItem('basket', JSON.stringify(basket));
// this.changeBasket$.next(true);

}
