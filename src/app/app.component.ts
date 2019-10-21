import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  logado = 'S';
  getToken() {
    if (localStorage.getItem('currentToken') !== '') {
      console.log('entrou +++');
      this.router.navigate([window.location.pathname]);
    }else{
        this.router.navigate(['/login']);
    }
    console.log(localStorage);
  }
  constructor(private router: Router) { this.getToken(); }

}
