import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {IProduct} from "../../model/product/product.model";
import {IOrder} from "../../model/order/order.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginStatus = new Subject<boolean>();

  constructor(
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private afs: AngularFirestore,
    private router: Router
  ) {
  }

  logOut(): void {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('');
        this.loginStatus.next(false);
      })
      .catch(err => {
        this.toastr.error(err.message, err.name)
      })
  }

  getUserInfo(id: string): Promise<any> {
    return this.afs.collection('users').doc(id).ref.get();
  }

  getUserInfoForLikes(id: string): Observable<any> {
    return this.afs.doc(`users/${id}`).valueChanges({idField: 'id'});
  }

  updateUserInfo(id: string, user: any): Promise<void> {
    return this.afs.collection('users').doc(id).update(user);
  }

  updateUserLiked(id: string, liked: any): Promise<void> {
    return this.afs.collection('users').doc(id).update({liked: liked});
  }

  updateUserOrders(id: string, orders: any): Promise<any>{
    return this.afs.collection('users').doc(id).update({orders: orders});
  }

}
