import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  status: Observable<string>;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.status = this.loginService.status;
  }

  logIn() {
    this.loginService.setStatus('loggedIn');
  }
  logOut() {
    this.loginService.setStatus('loggedOut');
  }
}
