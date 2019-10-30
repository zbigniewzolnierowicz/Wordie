import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginStatus = new BehaviorSubject<string>('');

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService, private toast: NbToastrService) {
    if (this.storage.get('status')) {
      this.loginStatus.next(this.storage.get('status'));
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
    if (this.currentStatus !== status) {
      this.loginStatus.next(status);
      this.toast.show(status, 'Performed log-in action', {
        icon: 'person'
      });
      this.storage.set('status', status);
    }
  }
}
