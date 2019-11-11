import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginStatus = new BehaviorSubject<string>('');
  private accountData = new BehaviorSubject<{id?: string, username?: string, password?: string, role?: string}>({});
  private accounts = [
    {
      id: 'admin-id',
      username: 'admin',
      password: 'admin',
      role: 'Administrator'
    },
    {
      id: 'user-id',
      username: 'user',
      password: 'user',
      role: 'Student'
    }
  ];

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {
    if (this.storage.get('userID')) {
      this.setStatus('loggedIn');
      this.accountData.next(this.accounts.find((account) => {
        if (this.storage.get('userID') === account.id) { return account; }
      }));
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

  get loggedInAccountData() {
    return this.accountData.asObservable();
  }

  get loggedInAccountRole() {
    return this.accountData.value.role;
  }

  logIn(username: string, password: string) {
    return new Promise((resolve, reject) => {
      if (this.currentStatus === 'loggedIn') {
        reject('Already logged in.');
      } else {
        const attemptAccount = this.accounts.find((account) => {
          if (username === account.username) { return account; }
        });
        if (attemptAccount.password === password) {
          this.storage.set('userID', attemptAccount.id);
          this.accountData.next(attemptAccount);
          console.log(this.accountData.value);
          this.setStatus('loggedIn');
          resolve('Log in successful');
        } else {
          reject('Bad password.');
        }
      }
    });
  }

  logOut() {
    this.setStatus('loggedOut');
    this.storage.remove('userID');
    this.accountData.next({});
  }

  setStatus(status: string) {
    return new Promise((resolve, reject) => {
      if (this.currentStatus !== status) {
        this.loginStatus.next(status);
        this.storage.set('status', status);
        if (this.currentStatus === status) {
          resolve(this.currentStatus);
        } else {
          reject('Did not update.');
        }
      } else {
        reject('Already logged in.');
      }
    });
  }
}
