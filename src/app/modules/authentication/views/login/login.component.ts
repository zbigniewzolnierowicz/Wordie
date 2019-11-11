import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { StatusService } from 'src/app/services/status.service';
import { NbToastrService } from '@nebular/theme';
import { LoginStatus } from 'src/app/enums/login-status.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginStatus: Observable<string>;
  status: Observable<string>;
  loginData = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private loginService: LoginService,
    private statusService: StatusService,
    private toast: NbToastrService,
    private router: Router) { }

  ngOnInit() {
    this.loginStatus = this.loginService.status$;
    this.status = this.statusService.statusObservable;
    this.loginStatus.subscribe(data => {
      if (data === LoginStatus.LOGGED_IN) { this.router.navigate(['cards']); }
    });
  }

  login() {
    this.loginService.logIn(this.loginData.value.username, this.loginData.value.password)
    .then(status => {
      this.toast.show(status, `Succesfully logged in!`, {
        icon: 'person',
        status: 'success'
      });
      this.router.navigate(['cards']);
    })
    .catch(err => {
      this.toast.show(err, `Log in error!`, {
        icon: 'person',
        status: 'danger'
      });
    });
  }
}
