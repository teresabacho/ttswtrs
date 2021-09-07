import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkProfileLogin();
  }

  checkProfileLogin(): boolean {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      const currentUser = JSON.parse(<string>localStorage.getItem('user'));
      if (currentUser && currentUser.role === "USER") {
        return true;
      }
      return false;
    }
    return false;
  }

}
