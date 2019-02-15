import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class LoginInService {
    private url = 'https://CrudRegioes-mktdigitaloi.brcom-central-1.oraclecloud.com/api/v1';

  constructor(private http: HttpClient) {}

      getName() {
        return 'Login';
  }
   postGetToken(login, password): Observable<any> {
       const httpOptions = {
           headers: new HttpHeaders({
               'Accept':  'application/json',
               'authorization': 'Basic ' + 'YnF1eThuaWdua202MGF0emxtaWpoa2Ixbm5ncGE5ejllbnQ2MGtwd2F5Y2NmNnRmbmJ5cjhhbzB4c3YwYjdheDpXZzM0bjlwcWszR3lOOEFoTG5PU3NqaWx5MHlDTHZlRlJ5Z2huWXljUlJVZ2gxI3RveXk4d0VZaE4wRlNxQmpw'
           })
       };
       console.log(login + password);
       return this.http.get(this.url + '/usuarios/login?email=' + login + '&password=' + password ,  httpOptions);
   }
}






