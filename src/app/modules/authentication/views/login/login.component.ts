import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { StatusService } from 'src/app/services/status.service';
import { NbToastrService } from '@nebular/theme';

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
    this.loginStatus = this.loginService.status;
    this.status = this.statusService.statusObservable;
  }

  logIn() {
    this.loginService.setStatus('loggedIn')
      .then(status => {
        this.toast.show(status, `Succesfully logged in!`, {
          icon: 'person',
          status: 'success'
        });
      })
      .catch(err => {
        this.toast.show(err, `Performed log-in action: ${status}`, {
          icon: 'person',
          status: 'danger'
        });
      });
  }
  logOut() {
    this.loginService.setStatus('loggedOut');
  }
}
