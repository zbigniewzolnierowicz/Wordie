import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NbToastrService } from '@nebular/theme';
import { UserRoles } from '../enums/user-roles.enum';
import { LoginStatus } from '../enums/login-status.enum';

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
      role: UserRoles.ADMIN
    },
    {
      id: 'user-id',
      username: 'user',
      password: 'user',
      role: UserRoles.USER
    }
  ];

  /**
   * Creates an instance of LoginService.
   * @param storage - WebStorageService injection
   */
  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) {
    if (this.storage.get('userID')) { // Check if the user ID is in the web storage
      this.setStatus(LoginStatus.LOGGED_IN); // Set the user status to 'logged in'
      this.accountData.next(this.accounts.find((account) => {
        // Find the account that matches the user ID and set it to the BehaviorSubject for other components to see
        if (this.storage.get('userID') === account.id) { return account; }
      }));
    } else {
      this.setStatus(LoginStatus.LOGGED_OUT); // If the user ID isn't in the web storage, set the log-in status to 'logged out'
    }
  }


  /**
   * Get the current login status as an observable
   */
  get status$() {
    return this.loginStatus.asObservable();
  }

  /**
   * Get the current login status as a static value
   */
  get status() {
    return this.loginStatus.value;
  }

  /**
   * Get the currently logged in user data as an observable
   */
  get loggedInAccountData$() {
    return this.accountData.asObservable();
  }
  /**
   * Get the currently logged in user's role
   */
  get loggedInAccountRole() {
    return this.accountData.value.role;
  }
  /**
   * Log in the user with the given username and password
   */
  logIn(username: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.status === LoginStatus.LOGGED_IN) { // Check if the user is already logged in
        reject('Already logged in.');
      } else {
        const attemptAccount = this.accounts.find((account) => { // Save the account that matches the username
          if (username === account.username) { return account; }
        });
        if (attemptAccount.password === password) { // Check if the provided password matches the account password
          this.storage.set('userID', attemptAccount.id); // Set the user ID in the web storage to the account's user ID
          this.accountData.next(attemptAccount); // Set the user data to the user's account data
          this.setStatus(LoginStatus.LOGGED_IN); // Set the login status to 'logged in'
          resolve('Log in successful'); // Resolve promise
        } else {
          reject('Bad password.'); // Reject promise
        }
      }
    });
  }

  /**
   * Log the user out
   */
  logOut() {
    this.setStatus(LoginStatus.LOGGED_OUT); // Set the login status to 'logged out'
    this.storage.remove('userID'); // Remove the user ID from web storage
    this.accountData.next({}); // Delete the user data from the BehaviorSubject
  }
  /**
   * Set the status to the provided status
   */
  setStatus(status: LoginStatus) {
    return new Promise((resolve, reject) => {
      if (this.status !== status) { // Check if the status is alredy set
        this.loginStatus.next(status); // Set the status in BehaviorSubject
        this.storage.set('status', status); // Set the status in web storage
        if (this.status === status) { // Check if the status was succesfully set
          resolve(this.status); // Return the login status
        } else {
          reject('Did not update.'); // Reject the promise - could not update the status
        }
      } else {
        reject(`Status already equal to ${status}`); // Reject the promise
      }
    });
  }
}
