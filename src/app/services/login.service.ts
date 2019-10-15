import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginStatus = new BehaviorSubject<string>('');

  constructor(private cookies: CookieService) {
    if (this.cookies.get('status')) {
      this.loginStatus.next(this.cookies.get('status'));
    } else {
      this.setStatus('loggedOut');
    }
  }

  get status() {
    return this.loginStatus.asObservable();
  }

  get currentStatus() {
    return this.loginStatus.value;
  }

  setStatus(status: string) {
    this.loginStatus.next(status);
    this.cookies.set('status', status);
  }
}
