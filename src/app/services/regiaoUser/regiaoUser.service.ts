import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RegiaoUserService {

  constructor(private http: HttpClient) { }

    private url = 'http://localhost:8098/api/v1';
    private token = 'YnF1eThuaWdua202MGF0emxtaWpoa2Ixbm5ncGE5ejllbnQ2MGtwd2F5Y2NmNnRmbmJ5cjhhbzB4c3YwYjdheDpXZzM0bjlwcWszR3lOOEFoTG5PU3NqaWx5MHlDTHZlRlJ5Z2huWXljUlJVZ2gxI3RveXk4d0VZaE4wRlNxQmpw';

    updateUsuario(payload): Observable<any> {
         const httpOptions = {
             headers: new HttpHeaders({
                 'Accept':  'application/json',
                 'authorization': 'Basic ' + this.token
             })
        };
        return this.http.put(this.url + '/usuarios' , payload, httpOptions);
    }

    createUsuario(payload): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.post(this.url + '/usuarios' , payload, httpOptions);
    }

    deleteUsuario(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.delete(this.url + '/usuarios/' + id, httpOptions);
    }
    getUsuarios(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.get(this.url + '/usuarios' ,  httpOptions);
    }

    getRegioes(): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.get(this.url + '/regiao' ,  httpOptions);
    }

    updateRegiao(payload): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.post(this.url + '/regiao-insert-custom' , payload, httpOptions);
    }

    createRegioes(payload): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.post(this.url + '/regiao-insert-custom' , payload, httpOptions);
    }

    deleteRegiao(id): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.delete(this.url + '/regiao/' + id, httpOptions);
    }

    createPublicaRegioes(payload ): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Accept':  'application/json',
                'authorization': 'Basic ' + this.token
            })
        };
        return this.http.post(this.url + '/regiao-publica' , payload, httpOptions);
    }
}
