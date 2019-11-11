import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { StatusService } from 'src/app/services/status.service';
import { NbToastrService } from '@nebular/theme';
import { LoginStatus } from 'src/app/enums/login-status.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginStatus: Observable<string>;
  status: Observable<string>;

  constructor(private loginService: LoginService, private statusService: StatusService, private toast: NbToastrService) { }

  ngOnInit() {
    this.loginStatus = this.loginService.status$;
    this.status = this.statusService.statusObservable;
  }

  logIn() {
    this.loginService.logIn('user', 'user')
    .then(status => {
      this.toast.show(status, `Succesfully logged out!`, {
        icon: 'person',
        status: 'success'
      });
    })
    .catch(err => {
      this.toast.show(err, `Log out error!`, {
        icon: 'person',
        status: 'danger'
      });
    });
  }
  logOut() {
    this.loginService.setStatus(LoginStatus.LOGGED_IN)
    .then(status => {
      this.toast.show(status, `Succesfully logged out!`, {
        icon: 'person',
        status: 'success'
      });
    })
    .catch(err => {
      this.toast.show(err, `Log out error!`, {
        icon: 'person',
        status: 'danger'
      });
    });
  }
}
