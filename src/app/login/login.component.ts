import { Component, OnInit } from '@angular/core';
import {LoginInService} from '../services/loginIn/login-in.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginOn;
  access_token;
  name;
  getService;
  login = {
    email: '',
    senha: ''
  };
  constructor(service: LoginInService, private  router: Router) {
    this.name = service.getName();
    this.getService = service;
    this.loginOn = false;
  }
  postToken() {
        this.getService.postGetToken(this.login.email, this.login.senha, this.access_token).subscribe(
          data => {
              if (data.status === 'Login com sucesso') {
                  localStorage.setItem('currentToken', 'logado');
                  this.router.navigate(['usuarios']);
              } else {
                  this.loginOn = true;
              }
            } ,
          error => {
            this.loginOn = true;
            console.log(error);
          }
        );
    }
    getLoginOn() {
        if (this.loginOn) {
          return true;
        } else {
          return false;
        }
    }
}
