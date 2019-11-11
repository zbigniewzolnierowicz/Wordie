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
import { UserRoles } from '../enums/user-roles.enum';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private login: LoginService, private router: Router, private toast: NbToastrService) {}
  isAdmin() {
    try {
      if (this.login.loggedInAccountRole === UserRoles.USER) {
        throw new Error('You are not an administrator.');
      }
      if (this.login.loggedInAccountRole === UserRoles.ADMIN) {
        return true;
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
    return this.isAdmin();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAdmin();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      return this.isAdmin();
  }
}
