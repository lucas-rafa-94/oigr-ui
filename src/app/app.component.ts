import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  getToken() {
    if (localStorage.getItem('currentToken') !== '') {
      console.log('entrou +++');
      this.router.navigate(['/login']);
    }
  }
  constructor(private router: Router) { this.getToken(); }

}
