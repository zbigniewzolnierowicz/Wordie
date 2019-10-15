import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginStatus: Observable<string>;
  status: Observable<string>;

  constructor(private loginService: LoginService, private statusService: StatusService) { }

  ngOnInit() {
    this.loginStatus = this.loginService.status;
    this.status = this.statusService.statusObservable;
  }

  logIn() {
    this.loginService.setStatus('loggedIn');
  }
  logOut() {
    this.loginService.setStatus('loggedOut');
  }
}
