import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loginStatus = new Subject<boolean>();

  constructor(
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private db: AngularFirestore,
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
    return this.db.collection('users').doc(id).ref.get();
  }

  updateUserInfo(id: string, user: any): Promise<void> {
    return this.db.collection('users').doc(id).update(user);
  }

  updateUserLiked(id: string, user: any): Promise<void>{
    return this.db.collection('users').doc(id).update(user);
  }

}
