import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { LoginStatus } from '../enums/login-status.enum';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private login: LoginService, private router: Router, private toast: NbToastrService) {}

  async isLoggedIn() {
    try {
      if (this.login.status === LoginStatus.LOGGED_IN) {
        return true;
      } else {
        throw new Error('You are not logged in.');
      }
    } catch (e) {
      this.router.navigate(['auth', 'login']);
      this.toast.show(e, 'Error!', {
        icon: 'close-outline',
        status: 'danger'
      });
      return false;
    }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isLoggedIn();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.isLoggedIn();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.isLoggedIn();
  }
}
